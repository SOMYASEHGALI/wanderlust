const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const cookieParser=require("cookie-parser");
const session = require("express-session");
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//const path=require("path");
// app.use(cookieParser("secretcode"));

// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send("hi,i am root");
// });
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signed cookie sent")
// });
// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);
//     res.send("verified")

// })
// //to get signedcookies write req.signedcookies
// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`hi,${name}`);
// })
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("madein","india");
//     res.send("hi")
// })
// app.use("/users",users);
// app.use("/posts",posts);
//const session=require("express-session");
// app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));
// app.get("/test",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     req.session.count=1;
//     res.send(`test successful ${req.session.count} times`);
// })
// app.get("/reqcount",(req,res)=>
// res.send(`u sent a request`))
app.listen(3000,()=>{
    console.log("server is listening to 3000")
})
const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next()
})
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
        req.flash("error","user not registered");
    } else{
        req.flash("success","user registered successfully");
    }
    //console.log(req.session.name);
    
    res.redirect("/hello");

})
app.get("/hello",(req,res)=>{
    //res.send(`hello,${req.session.name}`);
    // res.locals.successMsg=req.flash("success");
    // res.locals.errorMsg=req.flash("error");
    res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
})
//by this we can use information in diff orutes
//npm i connect-flash
//to use session type express-session