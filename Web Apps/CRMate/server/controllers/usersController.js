const mongoose = require('mongoose');

// import the user model
const User = mongoose.model('User');

// GET all registered users
const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};

// GET user by id
const getOneUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            res.status(400);
            return res.send('Query failed');
        }
        return res.send(user);
    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};

// POST add a new user
const addUser = async(req, res) => {
    const user = new User(req.body);

    try {
        let result = await user.save();
        return res.send(result)
    } catch (err) {
        res.status(400)
        return res.send('Query failed');
    }
};



module.exports = {getAllUsers, getOneUser, addUser};