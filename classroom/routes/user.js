const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("GET for users");
})
router.get("/:id",(req,res)=>{
    res.send("GET for users")
})
module.exports=router;