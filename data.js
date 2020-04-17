const request=require('request-promise'),
      express=require('express'),
      app=express()


app.get('/',async (req,res)=>{

const r=await request.get('http://www.json-generator.com/api/json/get/cqiRyloqmq?indent=2')

const r1=await request.get('http://www.json-generator.com/api/json/get/cfWENsiYMO?indent=2')

const data= JSON.parse(r)

var data1= JSON.parse(r1)

const count=names=>names.reduce((a,b)=>(
    {...a,[b]:(a[b]||0)+1}),{}
)



const filteredData= Object.entries(count(Object.keys(data1).sort().map(x=>x.slice(0,2))))


const sortedData1=Object.keys(data1).sort()

let current=0

filteredData.forEach((x,i)=>{


x[2]=sortedData1.slice(current,current+ x[1])


current+= x[1]

 })

var filteredData1=filteredData.map(x=>{
    
    const obj={}

    obj[x[0]]=x[2]

    return obj
})

filteredData1=  filteredData1.map(x=>{
    let y = Object.values(x)[0].map(x=>{
        const obj={}
        obj[x]=data1[x]
        if(data1[x].length>0)
        return obj
       
    }).filter(x=>x!=null)



const obj={}

    obj[Object.keys(x)[0]]=y

    return obj

})

  data1= filteredData1

  var z=[]
//   data.forEach(x=>{
//  z.push(data1[0][Object.keys(x)[0]])
//   })

data1.forEach(x=>{
   z.push(Object.keys(x).map(x=>x.slice(0,1))[0])
})

  z=Object.entries(count(z))

  current=0

  z=z.map((x,i)=>{


    x[2]=data1.slice(current,current+ x[1])
  
    
    current+= x[1]
   
    return x
    
     })

z=z.map((x)=>{
    let obj={}
    obj[x[0]]=x[2]
    return obj
})


data1=z


res.json(data1)




})





app.listen(3000,(()=>{console.log("served started")})())    