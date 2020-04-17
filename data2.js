const request=require('request-promise'),
      express=require('express'),
      app=express()

    app.get('/',async (req,res)=>{
      
    const r=await request.get('http://www.json-generator.com/api/json/get/clFDoJItWq?indent=2')


    const data= JSON.parse(r)


data.map((x,i)=>{

let arr=[]

let duplicates=[]

x[1].map((a,i)=>{
    if(a){

        if(!arr.includes(Object.keys(a)[0]))
        arr.push([Object.keys(a)[0],a])

arr.forEach((x,i)=>{
    if(arr[i+1] && arr[i+1][0]===arr[i][0])
    if(duplicates.length<1)
    duplicates.push(arr[i+1][0])
})

if(duplicates.length<2)
// console.log(duplicates)

// console.log(Object.keys(a)[0])

if( a && duplicates &&  duplicates.includes(Object.keys(a)[0]))
{
   x[1]= x[1].map(a=>{
    if(a)
    return x[1].splice(i,1)[0]

})
duplicates=[]



}


x[1]=x[1].filter(x=>x!==null)

    }
// console.log(a)

return a
})


})

var data1;
    data1=data

data1= data1.map(x=>{
    
    const obj={}
    obj[x[0]]=x[1]
return obj
})  


const count=names=>names.reduce((a,b)=>(
    {...a,[b]:(a[b]||0)+1}),{}
)


var y=data1.map(a=>Object.keys(a)[0].slice(0,1))



y=Object.entries(count(y))

let current=0

y=y.map((x,i)=>{

x[2]=data1.slice(current,current+x[1])

current+=x[1]

return x 

})

y=y.map((x,i)=>{
    const obj={}
    obj[x[0]]=x[2]
    return obj
})

res.json(y)
    
    })

    app.listen(3000,(()=>{console.log("served started")}) )   