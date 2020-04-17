const request=require('request-promise'),
      express=require('express'),
      app=express()

app.get('/',async (req,res)=>{

    // const r=await request.get('http://www.json-generator.com/api/json/get/bVfpSrHVgy?indent=2')

    // const r1=await request.get('http://www.json-generator.com/api/json/get/cjnsRfMsUi?indent=2')
    
    const data= JSON.parse(r)
    
    // var data1= JSON.parse(r1)

    // data.forEach((x,i)=>{
   
//    let key= Object.keys(x)[0]
//    let d= data[i][Object.keys(x)[0]]

//    Object.values(x)[0].forEach((x,i)=>{
    //    if(d)
    //    if(d[0][Object.keys(x)[0]])
    //    d[0][Object.keys(x)[0]].push(Object.values(x)[0][0])
//    })
     
// })

var y=[]
    data.forEach((x,i)=>{
   

   Object.values(x)[0].forEach((x,i)=>{
      

    y.push((Object.entries(x)[0]))

    })


})


y=y.filter(x=>x[0]!=0)


const sort= arr=>{
    
 arr=arr.map(x=>x?Object.entries(x):x)


arr=arr.sort((a,b)=>{
if(a&&b){

if(a[0][0]<b[0][0]){
    return -1
}else{
    return 1
}
}

return 0
})


arr= arr.map(x=>x?Object.fromEntries(x):x)

// console.log(arr)

return arr
}


y= y.map((x,i)=>{

 x[1]=sort(x[1].map((x,i)=>{
if(x)
{
let obj={}
obj[Object.keys(x)[0].toLowerCase()] =Object.values(x)[0]  
return obj
}else{
return x
}
}))




return x

})

res.send(y)


})

app.listen(3000,(()=>{console.log("served started")}) )   