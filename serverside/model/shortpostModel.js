import mongoose from 'mongoose'

const Shortpost = new mongoose.Schema(
    {
        shortpost: { type: String, required: true },
        creater: {type: String},
        createdBy: {type: String},
        likes: {type: [String], default: []},

    },
    {
        timestamps: true
    }
)

export default mongoose.model("Shortpost", Shortpost)