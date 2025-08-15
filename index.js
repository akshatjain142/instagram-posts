const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

let posts=[
    {   
        id:uuidv4(),
        username:"apnacollege",
        img:"https://wallpapercave.com/wp/wp10178856.png",
        caption:"live life to fullest"
    },
    {   
        id:uuidv4(),
        username:"akshat",
        img:"https://wallpapercave.com/wp/wp10178937.jpg",
        caption:"mark everyday as new opportunity"
    },
    {   
        id:uuidv4(),
        username:"shradha",
        img:"https://i.pinimg.com/originals/3d/7b/29/3d7b2988a88af92b143ca7bfed697ded.jpg",
        caption:"live life alone for best"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});
app.post("/posts",(req,res)=>{
    let {username,img,caption}=req.body;
    let id=uuidv4();
    posts.push({id,username,img,caption});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id==p.id);
    res.render("show.ejs",{post});
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id==p.id);
    res.render("update.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id==p.id);
    let newCaption=req.body.caption;
    post.caption=newCaption;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=> id!=p.id);
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
