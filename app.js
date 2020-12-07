const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const place=req.body.cityName;
  // console.log(place);
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=8103ac07155004086afbb157145f5cb7&units=metric#";
    https.get(url,function(respond){
        respond.on("data",function(data)
      {
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const desc=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p> The condition of the weather is : "+desc+"</p>");
        res.write("<h1> The current temperature of " + place + " is : "+ temp+" deg Celcius </h1>");
        res.write("<img src="+iconUrl+">");
        res.send();
      });
    });
});


app.listen(3000,function()
{
  console.log("Server running at port 3000");
});
