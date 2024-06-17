const express=require("express");
const router=express.Router();
router.get("/posts",(req,res)=>{
    res.send("GET for posts");
})
router.get("/posts/:id",(req,res)=>{
    res.send("GET for users")
})
module.exports=router;