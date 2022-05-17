const {User} = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, {new: true})
            .select('-__v')
            .then((user) => {
                !user
                    ? res
                        .status(404)
                        .json({ message: "User not found" })
                    : res.json('User Updated')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    deleteUser(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId })
            .then(thought => {
                !thought
                    ? res
                        .status(404)
                        .json({ message: "User not found"})
                    : res.json({ message: "User Deleted" })
            })
            .catch ((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}