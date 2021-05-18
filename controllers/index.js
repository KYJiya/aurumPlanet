function oneAPI (req, res) {
    const userId = req.body.userId;
    const pageUrl = req.body.pageUrl;
    const colorHex = req.body.colorHex;
    const text = req.body.text;
    res.status(200).json({
        "highlightId": "ID",
        "userId": userId,
        "pageUrl": pageUrl,
        "colorHex": colorHex,
        "text": text
    });
}

module.exports = {
    oneAPI: oneAPI
}