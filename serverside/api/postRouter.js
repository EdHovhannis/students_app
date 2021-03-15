import express from 'express'
const router = express.Router()
import expressasynchandler from "express-async-handler"
import Post from '../model/postsModel.js'
import {isAuth} from '../utils/utils.js'

router.get("/getdata", expressasynchandler(async (req, res) => {
    try {
        const post = await Post.find({})
        res.status(200).json(post)
    } catch {
        console.log(error);
        res.status(400).json("Items not found !")
    }
}))

router.post("/createdata", isAuth, expressasynchandler(async (req, res) => {
    try {
        const postItems = req.body
        const data = new Post({ ...postItems, author: req.user._id, time: new Date().toISOString() })
        await data.save()
        res.status(200).json({ message: "Items were successfully saved !" })
    } catch (error) {
        console.log(error);
        res.status(400).json("Items were not created !")
    }

}))


router.post("/updatedata/:id", isAuth, expressasynchandler(async (req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.id, req.body)
        await data.save()
        res.status(200).json({ message: "Items were successfully updated !" })
    } catch (error) {
        console.log(error);
        res.status(400).json("Items were not updated !")
    }
}))

router.post("/removedata/:id", isAuth, expressasynchandler(async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: "Items were successfully removed !" })
    } catch (error) {
        console.log(error);
        res.status(400).json("Items were not removed !")
    }
}))

export default router