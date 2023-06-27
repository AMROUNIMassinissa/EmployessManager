const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Authorization: Bearer <token>

    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        req.userId = decoded.userId;
        next();
    });
}
router.use((req, res, next) => {
    if (req.path !== "/signup" && req.path !== "/login") {
        return verifyToken(req, res, next);
    }
    next();
});

function sendJsonResponse(res, status, data) {
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(status).json({
        status: status,
        data: data,
    });
}
// User signup API
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("in signup", name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    let newUserCreated;
    try {
        newUserCreated = await newUser.save();
    } catch (e) {
        sendJsonResponse(res, 400, e);
        return;
    }
    const newUserString = JSON.stringify(newUserCreated);
    const token = jwt.sign({ userId: newUser._id }, "secretkey");
    const newUserJSON = JSON.parse(newUserString);
    resObj = { ...newUserJSON, token };
    sendJsonResponse(res, 200, resObj);
});

// User login API with JWT authentication
router.post("/login", async (req, res) => {
    console.log("in login", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return sendJsonResponse(res, 200, { message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        alert("fhsjkd");
        return sendJsonResponse(res, 401, { message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "secretkey");
    const loginUserString = JSON.stringify(user);
    const loginUserJSON = JSON.parse(loginUserString);
    resObj = { ...loginUserJSON, token };
    sendJsonResponse(res, 200, resObj);
});

router.get("/employees", (req, res, next) => {
    Employee.find({ creator: req.userId })
        .then(employees => {
            res.json(employees);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch employees" });
        });
});


router.get("/viewemployee/:id", (req, res, next) => {
    Employee.findById({ _id: req.params.id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/add", (req, res, next) => {
    console.log("add api `", req.userId);
    //adding a employee
    let newEmployee = new Employee({
        creator: req.userId,
        nom: req.body.nom,
        prenom: req.body.prenom,
        poste: req.body.poste,
        email: req.body.email,
        sexe: req.body.sexe,
        num: req.body.num,
        address: req.body.address,
        pays: req.body.pays,
        codepos: req.body.codepos,
        salaire: req.body.salaire,
    });
    newEmployee.save()
        .then(() => {
            res.status(201).json({ message: 'Employee added successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add employee' });
        });
});
router.delete("/delete/:id", (req, res, next) => {
    // Suppression d'un employé
    Employee.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json("Employé supprimé avec succès");
        })
        .catch(err => {
            res.json(err);
        });
});


//updating a employee
router.post("/update/:id", (req, res, next) => {
    const updateEmployee = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        poste: req.body.poste,
        email: req.body.email,
        sexe: req.body.sexe,
        num: req.body.num,
        address: req.body.address,
        pays: req.body.pays,
        codepos: req.body.codepos,
        salaire: req.body.salaire,
    };
    Employee.updateOne({ _id: req.params.id }, updateEmployee)
        .then(() => {
            res.status(201).json({
                message: "employee updated successfully",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
});

module.exports = router;
