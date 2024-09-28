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

const createUser = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const user = { firstName, lastName, email, favoriteColor, birthday };

    try {
        const response = await mongodb.getDatabase().db(dbName).collection("pj1_users").insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({_id: response.insertedId});
        }
        else {
            res.status(500).json(response.error || "Some error ocurred while creating the user");
        }
    } catch (error) {
        res.status(500).json(response.error || "Some error ocurred while creating the user");

    }
}

const updateUser = async (req, res) => {
    let userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    
    userId = new ObjectId(userId);

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const user = { firstName, lastName, email, favoriteColor, birthday };

    try {
        // const response = await mongodb.getDatabase().db(dbName).collection("pj1_users").replaceOne({_id: userId}, user);
        const response = await mongodb.getDatabase().db(dbName).collection("pj1_users").updateOne({_id: userId}, {$set: user});

        if(response.modifiedCount > 0){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || "Some error ocurred while updating the user");
        }
    } catch (error) {
        res.status(500).json(response.error || "Some error ocurred while updating the user");

    }
}

const deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    
    userId = new ObjectId(userId);

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const user = { firstName, lastName, email, favoriteColor, birthday };

    try {
        const response = await mongodb.getDatabase().db(dbName).collection("pj1_users").deleteOne({_id: userId});
        if(response.deletedCount > 0){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || "Some error ocurred while deleting the user");
        }
    } catch (error) {
        res.status(500).json(response.error || "Some error ocurred while deleting the user");

    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}
