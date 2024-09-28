const router = require("express").Router();

router.use("/", require("./swagger.routes"));
router.get("/", (req, res)=>{
    // #swagger.tags=['Hello World']
    res.send("Hello World")
});

router.use("/users", require("./users.routes"));

module.exports = router;
