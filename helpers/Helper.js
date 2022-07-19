const fullUrl = (req, res) => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;

}

module.exports = {
    fullUrl,
}