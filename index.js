import express  from "express";
import router from "./Routes/index.js";

const app = express();

app.get('/', function(req,res){
    res.send("Hello from Awdiz!")
});

app.use('/api/v1', router)

app.listen(8000, () => console.log('App is running on port 8000'))