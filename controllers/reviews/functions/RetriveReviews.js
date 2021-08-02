const mongoose = require("mongoose");
const Review = require("../../../models/Review.js");

function retrieveReviews(product_id) {
  var projection = {
    customerFullName: 1,
    rating: 1,
    body: 1,
    dateTime: 1,
  };

   return Review.find({product_id: product_id},projection)

    .then((docs) => {
      //console.log(docs);
      if (docs.length !== 0) {
        return { ok: true, data: docs };
      } else {
        return {
          ok: false,
          data: docs,
          message: "No reviews for this product",
        };
      }
    })
    .catch((error) => {
      if (
        error.path === "product_id" &&
        error instanceof mongoose.CastError &&
        error.kind === "ObjectId"
      ) {
        return { ok: false, message: "Invalid Product Id" };
      } else {
        return { ok: false, message: "Error When Getting Products" };
      }
    }); 

    
}
module.exports = retrieveReviews;