// in package.jsondependencies  has express which ha sversion in format -  major.minor.patch

// import modules

const { log } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");


//declare the port
const PORT = 5000;

//create server
const app = express();

//middlewares -- executed even before the request is generated  its between incoming and outgoing request
app.use((req,res, next)=>{      // it will run everytime before going to routing method  // it will run but not move to route methods thats why we use "next" that after executing middleware move to next that is routing method
    console.log((req.url));
    console.log((req.method));
    next();
});


//routing methods
app.get("/",(req,res)=>{
    res.status(200).send("Text from Backend");
});
app.get("/api/user",(req,res)=>{
    const user = {
        name:"AP Singh",
        gender:"Male"
    }
    res.json(user);
});
app.get("/api/image",(req,res)=>{
    const imagePath = path.join(__dirname,"Screenshot 2024-06-02 124725.png")
    fs.readFile(imagePath,(err,data)=>{
        if (err) {
            res.status(404).send("Image not found");
            
        }
        else{
            res.status(200).type("png").send(data);
        }
    })
});

app.get("/api/html",(req,res)=>{
    const htmlPath = path.join(__dirname,"contact.html");
    fs.readFile(htmlPath,(err,data)=>{
        if (err) {
            res.status(404).send("file not found");
            
        }
        else{
            res.status(200).type("html").send(data);
        }
    })
});

app.all("*",(req,res)=>{      // get/all in this case works same
    res.send("Resource not found maybe a typo")
});

//run the server

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});