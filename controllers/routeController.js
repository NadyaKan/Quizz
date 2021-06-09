exports.getIndexPage = (req, res) => {
    res.status(200).render('index');
}

exports.getHub = (req, res) => {
    res.status(200).render('hub');
}