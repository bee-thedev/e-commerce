import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Reviews from "./Reviews";

//here in the bracket comes stripe key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm= ({checkoutToken,shippingData, previousStep, onCaptureCheckout, nextStep, timeOut}) =>{

    const handleSubmitFunction = async(event, elements, stripe)=>{
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
          console.log('[error]', error);
        } else {
          const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
            shipping: { 
                name: 'International', 
                street: shippingData.address1, 
                town_city: shippingData.city, 
                county_state: shippingData.shippingSubdivision, 
                postal_zip_code: shippingData.zip, 
                country: shippingData.shippingCountry 
            },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                    payment_method_id: paymentMethod.id,
              },
            },
          };
    
          onCaptureCheckout(checkoutToken.id, orderData);
          timeOut();
          nextStep();
        }
      };


    return(
        <React.Fragment>
            <Reviews checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant="h6" style={{margin: '20px 0'}} gutterBottom>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe})=> (
                        <form onSubmit={(event)=> handleSubmitFunction(event, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                                <Button variant="outlined" onClick={previousStep}>Back</Button>
                                <Button variant="contained" type="submit" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </React.Fragment>
    )
};

export default PaymentForm;