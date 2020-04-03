
const request = require('request-promise')

const cheerio = require('cheerio')


const Nightmare=require('Nightmare')

const nightmare=Nightmare({show:true})


const fs = require('fs')

const req=require('request')

const  sample={
    title:'',
    rank:1,
    imdbRating:8.4,
    desc:"",
    posterUrl:'',
    posterImageUrl:''
}


async function scrape(){

const result = await request.get('https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm')

const $=cheerio.load(result)

const movies= $('tr').map((i,e)=>{
   
const title=$(e)
.find('td.titleColumn > a')
.text()

const descriptionUrl=

"https://www.imdb.com/"
+
$(e)
.find('td.titleColumn > a')
.attr('href')

const rating=
$(e).find('td.ratingColumn.imdbRating')
.text()
.trim()

return {title,rating,rank:i,desc:descriptionUrl}

})
.get()


return movies

}


async function scrapePoster(movies){

const moviesWithPosterUrls=await Promise.all(
    
    
    movies.map(async movie=>{

try{
   const html=await request.get(movie.desc)


   const $ = await cheerio.load(html)

   movie.posterUrl= 'https://www.imdb.com/'+  $('div.poster > a').attr('href')

   return movie
 
} catch (err) {
    // console.error(err)
}

}))

   return moviesWithPosterUrls

}




async function savePosters(movie){

req
.get(movie.posterImageUrl)
.pipe(fs.createWriteStream(`photos/${movie.rank}.png`))



}






async function scrapeImage(movies){

for(var i=0;i<movies.length;i++){


    try{
    const posterImageUrl = await nightmare
    .goto(movies[i].posterUrl)
    .evaluate(()=>$('#photo-container > div > div:nth-child(3) > div > div.pswp__scroll-wrap > div.pswp__container > div:nth-child(2) > div > img:nth-child(2)').attr('src'))

    movies[i].posterImageUrl=posterImageUrl

    console.log(posterImageUrl)

    savePosters(movies[i])

}catch(e){

    }


}

return movies

}


async function main(){
    
    let movies=await scrape()
    
    movies=await scrapePoster(movies)

    movies=await scrapeImage(movies)


}

// scrape()

main()


