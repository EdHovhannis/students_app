import mongoose from 'mongoose'

const Post = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    faculty: {type: String, required: true},
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    author: {type: String, required: true},
    course: {type: String, required: true},
    image: {type: String, required: true},
    time: {type: Date, default: new Date()}
})

export default mongoose.model("Post", Post)