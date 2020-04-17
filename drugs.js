const request = require("request-promise");
const cheerio = require("cheerio"),
      fs = require("fs")

var alphabets='abcdefghijklmnopqrstuvwxyz'

 alphabets=alphabets.split('')

let a=[]

async function scrape(){

    let array=[]
    let arr=[]
   

await alphabets.forEach(async function(x,i){

    var url = await `https://www.drugs.com/alpha/${x}.html`;

    const htmlResult = await request.get(url);
    
    
    const $ = await cheerio.load(htmlResult);
    
    arr=await []


     $('.ddc-paging').find('a').each(async function(x,i){

       await  arr.push($(this).attr('href'))
    

    })

    var y= {}

     y[x]=await arr

  await  array.push(y)

  console.log(array)
// fs.writeFileSync('data/types.json',JSON.stringify(array))

})



}


async function scrape1(){


var url='https://www.drugs.com/alpha/ab.html'


const htmlResult = await request.get(url);
    
    
const $ = await cheerio.load(htmlResult);

var array=[]



$('.ddc-list-column-2').find('a').each(async function(x,i){

array.push($(this).attr('href'))

})

const result=[]


array.forEach(async (x,i)=>{

var url=await 'https://www.drugs.com'+x

const htmlResult = await request.get(url);

const $ = await cheerio.load(htmlResult);

var title=JSON.stringify($('h1').text())

var brandNames=$('#content > div.contentBox > p.drug-subtitle > i').text()

var y={}

y[title]=brandNames

if(brandNames.length>0)
 result.push(y)

if(i==array.length-1)
a= result

})

return a

}

async function main(){
    
    const result =await scrape1()
    console.log(result)


}

main()
// scrape1()