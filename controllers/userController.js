const User = require("../models/user");


module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getOneUser(req, res) {
        try{
            const singleUser = await User.findOne({ _id: req.params.userId }).populate("thoughts").populate("friends")
            if(!singleUser) {
                return res.status(404).json({message: "No user with that ID"});
            }
            res.status(200).json(singleUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        console.log(req.body)
        try{
            const dbCreateUser = await User.create(req.body);
            console.log(dbCreateUser)
            res.status(200).json(dbCreateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try{
            const updateTheUser = await User.findOneAndUpdate({ _id: req.params.userId}, { $set: req.body }, { new: true, runValidators: true });
            if (!updateTheUser){
                return res.status(404).json({message: "No user found!"});
            }
            res.status(200).json(updateTheUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deleteTheUser = await User.findByIdAndDelete( req.params.userId )
            if(!deleteTheUser){
                return res.status(404).json({message: "No user found!"})
            }
            res.status(200).json(deleteTheUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createFriend(req, res) {
        console.log(req.body)
        try{
            const createFriend = await User.findOneAndUpdate({ _id: req.params.userId}, { $push: { friends: req.params.friendId } }, { new: true, runValidators: true });
            res.status(200).json(createFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deletefriend(req, res) {
        try {
            const deleteFriend = await User.findOneAndUpdate( { _id: req.params.userId}, { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true } )
            if(!deleteFriend){
                return res.status(404).json({message: "No user found!"})
            }
            res.status(200).json(deleteFriend)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

