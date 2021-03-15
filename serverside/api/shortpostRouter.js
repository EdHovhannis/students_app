import express from 'express'
import Shortpost from '../model/shortpostModel.js'
import User from '../model/userModel.js'
import expressasynchandler from 'express-async-handler'
import {isAuth} from '../utils/utils.js';
const router = express.Router()


router.get("/getdatashortpost", isAuth, expressasynchandler(async (req, res) => {
    try {
        const data = await Shortpost.find({})
        res.status(200).send(data)
    } catch(error) {
        res.status(400).send({message: "Something going wronn."})
    }
}))

router.post("/createdatashortpost", isAuth, expressasynchandler(async (req, res) => {
    try {
        const { shortpost } = req.body
        const data = new Shortpost({
            shortpost,
            creater: req.user._id,
            createdBy: req.user.name 
        })
        await data.save()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: "Something going wrong."})
    }
}))
router.post("/removedatashortpost/:id", isAuth, expressasynchandler(async (req, res) => {
    try {
        
        const data = await Shortpost.findByIdAndRemove(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: "Something going wrong."})
    }
}))

router.post("/updatedatashortpost/:id", isAuth, expressasynchandler(async (req, res) => {
    try {
        const data = await Shortpost.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: "Something going wrong."})
    }
}))

router.post("/updatecreatedby/:id", isAuth, expressasynchandler(async (req, res) => {
    try {
        const data = await Shortpost.findOneAndUpdate({creater: req.params.id}, req.body )
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: "Something going wrong."})
    }
}))

router.get("/userdetails/:id", expressasynchandler(async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: "Something going wrong."})
    }
}))

router.post('/likedatashortpost/:id', isAuth, expressasynchandler(async (req, res) => {
    if(!req.user) {
        return res.status(400).json({message: "user is not authenticated"})
    }
    try {
        const data = await Shortpost.findById(req.params.id)
        const ind = data.likes.findIndex((_id) => {
                return _id === req.user._id
        })

        if(ind === -1) {
            data.likes.push(req.user._id)
        } else {
            data.likes = data.likes.filter((_id)=>{
                return _id !== req.user._id
            })
        }

        const like = await Shortpost.findByIdAndUpdate(req.params.id, data)
        res.status(200).send(like)
        
        
    } catch (error) {
        console.log(error)
    }
}) )

router.post('/userdetailslike/:id', isAuth, expressasynchandler(async (req, res) => {
    if(!req.user) {
        return res.status(400).json({message: "user is not authenticated"})
    }
    try {
        const data = await User.findById(req.params.id)
        const ind = data.likes.findIndex((_id) => {
                return _id === req.user._id
        })

        if(ind === -1) {
            data.likes.push(req.user._id)
        } else {
            data.likes = data.likes.filter((_id)=>{
                return _id !== req.user._id
            })
        }

        const like = await User.findByIdAndUpdate(req.params.id, data)
        res.status(200).send(like)
        
        
    } catch (error) {
        console.log(error)
    }
}) )






export default router