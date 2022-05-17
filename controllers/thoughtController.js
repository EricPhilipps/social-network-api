const {Thought, User} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .select('-__v')
            .populate('reactions')
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but no user with that ID found' })
                    : res.json('Thought created')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params }, req.body, {new: true})
            .select('-__v')
            .then((thought) => {
                !thought
                    ? res
                        .status(404)
                        .json({ message: "Thought not found" })
                    : res.json('Thought Updated')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params })
            .then(thought => {
                !thought
                    ? res
                        .status(404)
                        .json({ message: "Thought not found"})
                    : res.json({ message: "Thought Deleted" })
            })
            .catch ((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}