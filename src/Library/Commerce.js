import Commerce from "@chec/commerce.js";


// For this wee need API which we can get from commerce.js
// That API is obv cannot be put on the open so we place it inside '.env' file

export const commerce= new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY,true);