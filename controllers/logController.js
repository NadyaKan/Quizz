exports.log = (req, res, next) => {
    let reqMethod = req.method;
    let reqURL = req.url;
    console.log(`processing incomming request: ${reqMethod} ${reqURL}`);
    next();
}