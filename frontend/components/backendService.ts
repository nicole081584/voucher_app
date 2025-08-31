 /** 
 * This is the code to connect to the backend service API provided seprately.
 * 
 * The following routes are supported:
 *  orderVoucher - POST /voucher
 **/

import { giftVoucher } from "./giftVoucher";
import Constants from 'expo-constants';


const apibase = Constants.expoConfig?.extra?.API_BASE;
console.log("API base URL:", apibase);


/**
 * Orders a voucher for a given value to obtain a voucher number and date
 * 
 * error handling: throws an error if the service returns an error
 * 
 * @param title         customers title
 * @param lastName      customers last name
 * @param firstName     customers first Name
 * @param phoneNumber   the contact phone number for the customer
 * @param email         the email address of the customer
 * @param value         the value of the voucher
 * @returns             the voucher fully filled in, including number and date
 */
export async function orderVoucher(
    title: string,
    firstName: string,
    lastName:string, 
    phoneNumber: string, 
    email: string, 
    value:number)
            :Promise<giftVoucher> {
  
   console.log("Sending request body:", {
    title,
    firstName,
    lastName,
    phoneNumber,
    email,
    value,
  });

  try {
    const response = await fetch(apibase + "vouchers", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        firstName,
        lastName,
        phoneNumber,
        email,
        value,
      }),
      
    });
    const json = await response.json();
    const data = checkResponse(json);
    const voucher = new giftVoucher (
      data.title,
      data.firstName,
      data.lastName, 
      data.phoneNumber,
      data.email,
      data.value,
      data.date, 
      data.voucherNumber);
   
    console.log("Received voucher:", voucher);
    alert("Voucher ordered");
    return voucher;
    

  } 
  catch (error: any) {
    console.error("Fetch failed, voucher not ordered:", error);
    //alert("Error sending voucher: " + (error.message || String(error)));
    throw error; // this will be handled by the onSubmit function in index
  }
}

/**
 * A helper function that checks the JSON response for errors and handles them
 *
 * @param  response  the JSON object recived from the service
 * @return processes response
 */
function checkResponse(response:any):any {
  if (response.status!="success") {
    throw(response.message);
  }
  else if (response.data) {
    return response.data;
  }
  else {
    return response;
  }
}
