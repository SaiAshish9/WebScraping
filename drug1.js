// const request = require("request-promise");
const cheerio = require("cheerio");
const express=require('express')
const app=express()

const request=require('requestretry').defaults({fullResponse:false,retryDelay:10})



app.get('/',(req,res) => {


    const array = [];


    var alphabets='abcdefghijklmnopqrstuvwxyz'
    
    alphabets=alphabets.split('')
    
    
    
    async function scrapeCombinations() {
      
        return await Promise.all(
        
        alphabets.map(async x=>{
    
    try{
        var url = await `https://www.drugs.com/alpha/${x}.html`;
    
        const htmlResult = await request.get(url);
        
        
        const $ = await cheerio.load(htmlResult);
    
        var arr=[]
    
    
        $('.ddc-paging').find('a').each(async function(x,i){
    
          await  arr.push($(this).attr('href'))
       
    
       })
    
       var y= {}
    
        y[x]=await arr
    
    return y
    
    }catch(e){
    console.error(e)
    }
    })
    )
    }
    
    
    
    
    
    
    
      async function scrapeDrugUrls(url) {
        try {
            const htmlResult = await request({ 
            url:url, 
            headers: {
              'User-Agent': 'Request-Promise'
            }
                          })
          const $ = await cheerio.load(htmlResult);
    
          $('.ddc-list-column-2').find('a').each(async function(x,i){
          
          array.push($(this).attr('href'))
          
          })
    
          return array;
        } catch (err) {
          // console.error(err);
        }
      }
    
      async function scrapeBrandNames(urls) {
        return await Promise.all(
          urls.map(async y => {
            try {
                     
                var url=await 'https://www.drugs.com'+y
                
                const htmlResult = await request({ 
                  url:url, 
                  headers: {
                    'User-Agent': 'Request-Promise'
                  }
                                })
                
                const $ = await cheerio.load(htmlResult);
                
                var title=$('h1').text()
                
                var brandNames=$('#content > div.contentBox > p.drug-subtitle > i').text()
                
                var y={}
    
                if(brandNames.length>0)
                {y[title]=brandNames
                    return y;
                }else{
                    return null
                }
    
            } catch (error) {
              // console.error(error);
            }
          })
        );
      }
    


async function result(){

const combinations=await scrapeCombinations()

return await Promise.all(
    
    combinations.map(async (x,i)=>{


try{

x[alphabets[i]].map(async x=>{

try{

var a=await scrapeDrugUrls(`https://www.drugs.com${x}`)

var b=await scrapeBrandNames(a)

// console.log('done')

return await b.filter(x=>x!=null)

}catch(e){
    // console.log(e)
}

})

}
catch(err){
    // console.log(err);
}

    })
    
    
    )


}

      async function scrape() {




    // const u = await scrapeDrugUrls(url1);
    // var brand = await scrapeBrandNames(u)
    // brand=await brand.filter(x=>x!=null)

    // const u1 = await scrapeDrugUrls(url2);



    const url="https://www.drugs.com/alpha/z0-9.html"


    const url1="https://www.drugs.com/alpha/je.html"
    const url2="https://www.drugs.com/alpha/je.html"

    const urls=[url,url1,url2]

// uy
    // const result= await Promise.all(
      //  urls.map(async url =>{
        // try{

          const u2 = await scrapeDrugUrls(url);
    var brand2 = await scrapeBrandNames(u2)
    const x=await url.split('a/')[1].split('.')[0]

    brand2=await brand2.filter(x=>x!=null)

    const obj=  {}
obj[x]=await brand2

// return obj

        // }catch(err){

        // }
      // })
    // )


res.json(obj)
    // res.json(result)

      //  const data=await result()

      //  res.json(data)

        // res.json(combinations)
    
      }
    
      
    
    
    
    
    
      scrape()
    


})




app.listen(3000,()=>console.log("server started"))
