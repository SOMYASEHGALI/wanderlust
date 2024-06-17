const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js");
const Listing=require("../models/listing");
const ExpressError=require("../utils/expresserror.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const {isLoggedIn}=require("../middleware.js");
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else {
        next();
    }
}
router.get("/",async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("/index.ejs",{allListings});
    })
    router.get("/new",isLoggedIn,(req,res)=>{
        //console.log(req.user);
        
        res.render("listings/new.ejs");
    })
    router.put("/:id",async(req,res)=>{
        let {id}=req.params;
       await Listing.findByIdAndUpdate(id,{...req.body.listing});
       req.flash("success","Listing updated");
    res.redirect("/listings");
    })
    //show route
    router.get("/:id",async (req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error","listing you requested does not exist");
            res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing});
    });
    //create route
    router.post("/",
    wrapAsync (async (req,res,next)=>{
        if(!req.body.listing){
            throw new ExpressError(400,"send valid data for listing")
        }
       // let {title,description,image,price,country,location}=req.body;
    {const newListing=new Listing(req.body.listing);
        await newListing.save();
        req.flash("success","new listing created!");
        res.redirect("/listings");}
        
       
    }))
    //delete route
    router.delete(
        "/:id",isLoggedIn,wrapAsync(async(req,res)=>{
            let {id}=req.params;
            let deletedListing=await Listing.findByIdAndDelete(id);
            req.flash("success","listing deleted");
            res.redirect("/listings");
        })
    )
    //edit route
    router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("listings/edit.ejs",{listing})
    }))
    module.exports=router;