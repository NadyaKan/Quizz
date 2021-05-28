exports.getIndexPage = (req, res) => {
    res.status(200).render('index');
}

exports.getAboutUsPage = (req, res) => {
    res.status(200).render('aboutus');
}

exports.getInstructionPage = (req, res) => {
    res.status(200).render('instruction');
}

exports.getHub = (req, res) => {
    res.status(200).render('hub');
}