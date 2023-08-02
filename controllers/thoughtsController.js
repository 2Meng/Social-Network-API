const User = require("../models/user");
const Thought = require("../models/thoughts");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            if(!thought) {
                return res.status(404).json({message: "No thought found with that ID"})
            }
            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createThought(req, res) {
        try {
            const createThought = await Thought.create(req.body);
            const updateUser = await User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: createThought._id} }, { new: true, runValidators: true})
            if(!updateUser){
                return res.status(404).json({message: "No user found!"})
            }
            res.status(200).json({thought: createThought, user: updateUser})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateThought (req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $set: req.body }, { new: true, runValidators: true })
            if (!updateThought){
                return res.status(404).json({message: "No thought found!"})
            }
            res.status(200).json(updateThought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteThought (req, res){
        try {
            const deleteThought = await Thought.findByIdAndDelete( req.params.thoughtId)
            if(!deleteThought){
                return res.status(404).json({message: "No thought found!"})
            }
            res.status(200).json(deleteThought)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}