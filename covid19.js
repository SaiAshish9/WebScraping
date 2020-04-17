const request = require("request-promise");
const cheerio = require("cheerio");



const url = "https://www.mohfw.gov.in/";

async function scrape(){

const htmlResult = await request.get(url);

const $ = await cheerio.load(htmlResult);

var arr=[]
$('.table').find('tr').each(function(x,i){
var y=  $(this).find('td')
var array=[] 
array.push(y.eq(1).text(),y.eq(2).text(),y.eq(3).text(),y.eq(4).text())
arr.push(array)
})
console.log(arr)

}

scrape()