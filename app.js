const request = require("request-promise");
const cheerio = require("cheerio");
const express=require('express')
const app=express()

const url = "https://www.datawrapper.de/_/qplWW/";


app.get('/', async (req,res)=>{
  const htmlResult = await request.get(url);
  const $ = await cheerio.load(htmlResult);
  const scrapeResults = [];


console.log($)

$('.collapse').each((i,x)=>{
  if($(x).find('.title').html()){
  scrapeResults.push({
    title:$(x).find('.title').html(),
    description:$(x).find('.content-abstract').text(),
    imageUrl:$(x).find('a').attr('href')
  })}

})


res.json($)
})

app.listen(3000,()=>console.log("server started"))
