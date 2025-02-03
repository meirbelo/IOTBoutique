const { User, validateUserSignUp, validateUserSignIn } = require('../models/account.model');

// Get users
exports.getUsers = async (req, res) => {
    try {
        let users = await User.find({});
        if (users.length === 0) {
            return res.status(404).send('No users found.');
        }  
        res.status(200).render("adminUsersList", { users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Update a user
exports.updateUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,     
            { new: true } 
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).redirect("/admin/users");
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
};

// Delete a user
exports.deleteUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(204).redirect("/admin/users");
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
