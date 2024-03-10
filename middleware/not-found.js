const notFound = (req, res) => {
    res.status(404).send("Route is not found")
}

module.exports = notFound

// this midlleware is for default responce to  route error
// all the invalid routes are handle above responce