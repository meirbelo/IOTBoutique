exports.renderMemberPage = (req, res) => {
    res.render("member",  {user : req.user });
};