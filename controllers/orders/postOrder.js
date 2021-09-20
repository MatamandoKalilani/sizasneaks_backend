const { USER_CREDENTIAL } = require("../constants/userType.js");
const retrieveCartByUserId = require("../cart/functions/retreiveCartByUserId.js");
const prepareCartData = require("../cart/functions/prepareCartData.js");
const createOrder = require("./functions/createOrder.js");

const postOrder = async function (req, res) {
  try {
    console.log("Post Order Controller");
    if (req.body.credential === USER_CREDENTIAL.CUSTOMER) {
      if (typeof req.body.shippingId !== "undefined") {
        //Retrieve User Cart
        var retrieveCartByUserIdResult = await retrieveCartByUserId(
          req.body.userId
        );

        if (retrieveCartByUserIdResult.ok === true) {
          //Prepare Cart Data
          var prepareCartDataResult = await prepareCartData(
            retrieveCartByUserIdResult.data
          );
          if (prepareCartDataResult.ok === true) {
            console.log("Prepared Cart Data");
            console.log(prepareCartDataResult);
          } else {
            res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
            res.send(prepareCartDataResult);
          }
        } else {
          res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
          res.send(retrieveCartByUserIdResult);
        }
      } else {
        res.status = STATUS_CODE.BAD_REQUEST; //Attaches Bad Request Status Code to response object.
        res.send({
          //Sends back object with ok set to false and with a message detailing the possible reason for execution failure.
          ok: false,
          message: "Please provide a shipping addressId value",
        });
      }
    } else {
      res.status = STATUS_CODE.UNAUTHORIZED;
      res.send({
        ok: false,
        message: "Access Denied: Insufficient Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    // Sending a response when an unknown error occurs during execution.
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR; // Attaching an Internal Server Error Status code to the response object.
    res.send({ ok: false, message: "Unknown Server Error" });
  }
};

module.exports = postOrder;
