const express=require("express")

const https=require("https")

const bodyParser=require("body-parser")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){


// res.send("server is up and running")

res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){

const query=req.body.cityName

const apikey="5f8a67d4ea9ef2b264b7e2f8f235b7a3"

const unit="metric"

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit

https.get(url,function(response){

   console.log(response.statusCode)
   response.on("data",function(data){
    
    const weatherdata=JSON.parse(data)
    console.log(weatherdata)   

    // const object={
    //     name:"Nishant",
    //     food:"taco"
    // }

    // console.log(JSON.stringify(object))

    const temp=weatherdata.main.temp
    console.log(temp)
    const temp1=weatherdata.weather[0].description
    const icon=weatherdata.weather[0].icon
    const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
    console.log(temp1)
    res.write("<p>The weather is currently "+temp1+" </p>")
    res.write("<h1>The temperature in " +query+" is "+temp+" degrees celsius</h1>")
    res.write("<img src="+imageurl+">")
    res.send()

})

})


})



app.listen(3000,function(){

   console.log("Server is running at port 3000")
})