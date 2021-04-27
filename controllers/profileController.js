const userInfo = [
    {name: "Mary Smith", email: "mary@smith", birthDate: "09/02/1999"}
];
exports.getProfile = (req, res) => {
    res.render("profile", {
        userInfo: userInfo
    });
}
exports.postProfile = (req, res) => {
    res.render('profile');
};