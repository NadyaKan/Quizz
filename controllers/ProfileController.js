const userInfo = [
    {name: "Mary Smith", email: "mary@smith", birthDate: "09/02/1999"}
];
exports.getProfilePage = (req, res) => {
    res.render("profile", {
        userInfo: userInfo
    });
}
exports.postProfile = (req, res) => {
    res.render('profile');
};