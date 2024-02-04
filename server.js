
import bodyParser from "body-parser";
import axios from "axios";
import express from "express";
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.get("/", (req,res)=>
{
  res.render("index.ejs",{weather:null,error:null});
})
app.get("/weather",async(req,res)=>{
  const city = req.query.city;
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd3458ee07b2606b83d1a1af8be613f2`
let weather;
let error = null;
try{
  const response = await axios.get(url);
  weather=response.data;
}

catch(error){
  weather=null;
  error="error,";

}
res.render("index.ejs",{weather, error})
  
}
)
app.listen(port,()=>{
  console.log(`app is listening on port ${port}`)
});