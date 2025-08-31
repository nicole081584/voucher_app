// routes/vouchers.js

"use strict";

const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const giftVoucher_js = require('../libraries/giftVoucher.js'); 
const { voucherServiceManager } = require('../libraries/voucherServiceManager');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const voucherManager = new voucherServiceManager();

/**
* The handler for the POST /voucher route.
* To purchase a voucher, the customer must provide a name, phone Number, email address and voucher value.
*
* @param request   the request object
* @param response  the response object
*/

router.post('/', jsonParser, async (req, res) => {
  try {
    const result = await postVoucher(
      req.body.title,
      req.body.firstName,
      req.body.lastName,
      req.body.phoneNumber,
      req.body.email,
      req.body.value
    );

    if (result.status === "success") {
      return res.status(201).json(result); // voucher created
    } else {
      const code = result.statusCode || 400;
      return res.status(code).json({ status: result.status, message: result.message });// bad request or validation fail
    }
  } catch (err) {
    console.error("Error in POST /vouchers:", err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

/**
 * The implementation of the POST /voucher route. This will add a new voucher
 * to the database.
 *
 * @param title       title of the customer
 * @param firstName   first name of the customer
 * @param lastName    lastName of the customer
 * @param phoneNumber phone Number of the Customer
 * @param email       email of the customer
 * @param value       value of the voucher
 * @returns           if sucessful a JSON string representing a list of voucher(s)
 */
 async function postVoucher(title, firstName, lastName, phoneNumber, email, value) {

    //log Post voucher and values
    console.log("Request to POST voucher: " + title + ", " + firstName + ", " + lastName + ", " + phoneNumber + ", " + email + ", " + value);
    // generate a 18 digit random voucher number with nanoid  
    const voucherNumber = nanoid(18);
    //get purchase date
    const purchaseDate = new Date().toLocaleDateString("en-GB");
    //add all values to one instance of voucher
    var voucher = new giftVoucher_js.giftVoucher(title, firstName, lastName, phoneNumber, email, value);
    voucher.voucherNumber = voucherNumber;
    voucher.date = purchaseDate;

    //add voucher to DB
    try {
      const success = await voucherManager.addVoucher(voucher, 'vouchers');
      if (!success) {
        console.log("Voucher creation failed");
        return { status: "error", message: "Purchase unsuccessful" };
      }

      try {
        await voucherManager.mailVoucher(voucher);
      }   catch (mailErr) {
        console.error("Error sending voucher:", mailErr);
        await voucherManager.deletVoucher(voucher, 'vouchers');
        return { status: "error", message: "Failed to send voucher" };
      }

      const result = { status: "success", data: JSON.parse(voucher.stringify()) };
      
     //log what happened and respons error if unsucessfull
      console.log("Response from POST voucher:", result);
      return result;

    } catch (err) {
    console.error("Error adding voucher:", err);
    return { status: "error", message: "Server error", statusCode: 500 };
  }
}

module.exports = router;