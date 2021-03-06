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
router.post("/", handleCredentialClaims, verifyUserIdToken, postUser);

//Update User Profile
const patchUser = require("../controllers/user/patchUser.js");
router.patch("/", handleCredentialClaims, verifyUserIdToken, patchUser);

//Get User Profile Data
const postLogInUser = require("../controllers/user/postLogInUser.js");
router.post(
  "/log-in",
  handleCredentialClaims,
  verifyUserIdToken,
  postLogInUser
);

//Shipping

// create new User Shipping address
const postShippingAddress = require("../controllers/shippingAddress/postShippingAddress.js");
router.post(
  "/shipping",
  handleCredentialClaims,
  verifyUserIdToken,
  postShippingAddress
);

//Get User Shipping addresses
const getShippingAddresses = require("../controllers/shippingAddress/getShippingAddresses.js");
router.get(
  "/shipping",
  handleCredentialClaims,
  verifyUserIdToken,
  getShippingAddresses
);

//Get a Specific User's Shipping Address
const getShippingAddress = require("../controllers/shippingAddress/getShippingAddress.js");
router.get(
  "/shipping/address",
  handleCredentialClaims,
  verifyUserIdToken,
  getShippingAddress
);

//Update a User's Specific Shipping Address
const putShippingAddress = require("../controllers/shippingAddress/putShippingAddress.js");
router.put(
  "/shipping/address",
  handleCredentialClaims,
  verifyUserIdToken,
  putShippingAddress
);

//delete a User's Specific Shipping Address
const deleteShippingAddress = require("../controllers/shippingAddress/deleteShippingAddress.js");
router.delete(
  "/shipping/address",
  handleCredentialClaims,
  verifyUserIdToken,
  deleteShippingAddress
);
module.exports = router;
