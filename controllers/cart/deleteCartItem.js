var { STATUS_CODE } = require("../constants/httpConstants.js");
const deleteSingleCartItem = require("./functions/deleteSingleCartItem.js");

async function deleteCartItem(req, res, next) {
  try {
    console.log(req.body);
    if (
      typeof req.body.product_id !== "undefined" &&
      typeof req.body.option.size !== "undefined" &&
      typeof req.body.option.color !== "undefined"
    ) {
      if (req.body.credential === "customer") {
        var deleteSingleCartItemResult = await deleteSingleCartItem(
          req.body.userId,
          req.body.product_id,
          req.body.option
        );

        if (deleteSingleCartItemResult.ok === true) {
          res.status = STATUS_CODE.SUCCESS;
          res.send(deleteSingleCartItemResult);
        } else {
          res.status = STATUS_CODE.BAD_REQUEST;
          res.send(deleteSingleCartItemResult);
        }
      } else {
        res.status = STATUS_CODE.UNAUTHORIZED;
        res.send({
          ok: false,
          error: "Access Denied - Unauthorized Credentials",
        });
      }
    } else {
      res.status = STATUS_CODE.BAD_REQUEST;
      res.send({
        ok: false,
        error: "Insufficient Data Supplied",
      });
    }
  } catch (error) {
    console.log(error);
    res.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    res.send({ ok: false, error: "Unkown Server Error" });
  }
}

module.exports = deleteCartItem;