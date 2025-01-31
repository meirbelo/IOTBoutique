exports.MemberPage = (req, res) => {
    res.render("member",  {user : req.user });
};