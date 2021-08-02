var express = require("express");
const router = express.Router();


//Handle Credential Claims
const handleCredentialClaims = require("../controllers/user/functions/handleCredentialClaims.js");


//Verify User ID
const verifyUserIdToken = require("../controllers/user/functions/verifyUserIdToken.js");

//Get User Profile Data
const getUser = require("../controllers/user/getUser.js");
router.get("/", handleCredentialClaims, verifyUserIdToken, getUser);


//Create new User Profile
const postUser = require("../controllers/user/postUser.js");
router.post("/",handleCredentialClaims, verifyUserIdToken, postUser);


//Update User Profile
const patchUser = require("../controllers/user/patchUser.js");
router.patch("/", handleCredentialClaims, verifyUserIdToken, patchUser);



module.exports = router;