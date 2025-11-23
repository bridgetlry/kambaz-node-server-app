import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        points: Number,
        due_date: Date,
        available_date: Date,
        course: String
    }
 , { collection: "assignments" });
export default schema;