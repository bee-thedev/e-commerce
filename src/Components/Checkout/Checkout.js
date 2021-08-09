import React from "react";
import { useState,useEffect } from "react";
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";
import useStyles from "./CheckoutStyle";

import {commerce} from "../../Library/Commerce";
// import ConfirmationArea from "./ConfirmationArea";
// import SubmissionForm from "./SubmissionForm";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

const steps = ["Shipping Address", "Payment details"]

const Checkout = ({cart}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    useEffect (()=>{
        const generateCheckoutToken = async()=>{
            try{
                const token = await commerce.checkout.generateCheckoutToken(cart.id, {type: 'cart'});

                console.log(token);

                setCheckoutToken(token);
            }catch(error){

            }
        }
        generateCheckoutToken();

    },[]);

    const ConfirmationArea = () =>(
            <div>Confirmed!</div>
        );

        const SubmissionForm = () =>(
                    activeStep === 0 ? <AddressForm />  : <PaymentForm />
                    );

    return(
        <React.Fragment>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" aligh="center">Checkout</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <ConfirmationArea /> : <SubmissionForm />}
                </Paper>

            </main>
        </React.Fragment>

    )
}

export default Checkout;