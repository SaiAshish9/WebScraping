const request=require('request-promise')

const cheerio=require('cheerio')

async function scrape(){

   for(let i=0;i<=360;i=i+120){

const html = await request.get(
    'https://sfbay.craiglist.org/search/vol?s='+i
)

const $=await cheerio.load(html)

$('.result-title').each((i,e)=>{
    console.log($(e).text())
})

   }

}

scrape()
