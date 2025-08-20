import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Timer from "../models/timer";

//@desc create a timer 
//@route POST /api/admin/timer
//@access public
const createTimer = asyncHandler(async(req:Request, res:Response)=>{
    console.log("enter")
    let {status, collection} = req.body;
    if(!collection){
        throw new Error("entrer le nom de la categorie")
    }
    if(!status){
        status=false
    }
    const timer = await Timer.create({status, collection})
    res.status(201).json({reps: timer, done:true})
})

//@desc update timer
//@route PUT /api/admin/timer/:id
//@access public
const updateTimer = asyncHandler(async(req:Request, res:Response)=>{
    const id = req.params.id;
    const {status, collection} = req.body
    const timer = await Timer.findByPk(id)
    if(!timer){
        res.status(400).json({message:"pas de timer dispo"})
        return
    }
    if (status !== undefined) {
  timer.status = status;
}

if (collection !== undefined) {
  timer.collection = collection;
}
    await timer.save();
    res.status(200).json({reps:timer, done: true})
})
//@desc read timer
//@route GET /api/admin/timer
//@access public
const getTimer = asyncHandler(async(req:Request, res:Response)=>{
        const timer = await Timer.findOne()
    timer ?res.status(200).json({reps: timer, done:true}):res.status(200).json({reps: null, done:false})
})

export {createTimer, updateTimer, getTimer}