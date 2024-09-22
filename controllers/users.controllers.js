require("dotenv").config();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const dbName = process.env.MONGO_DB_NAME;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db(dbName).collection("pj1_users").find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    }).catch((err) => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ error: "Server Error" });
    });
}

const getSingle = async (req, res) => {
    let userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    
    userId = new ObjectId(userId);

    try {
        const result = await mongodb.getDatabase().db(dbName).collection("pj1_users").findOne({ _id: userId });
        console.log(result);
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);

    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
    getAll,
    getSingle
}