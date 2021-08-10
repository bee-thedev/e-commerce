import React from "react";
import { useState,useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from "@material-ui/core";
import useStyles from "./CheckoutStyle";

import {commerce} from "../../Library/Commerce";
// import ConfirmationArea from "./ConfirmationArea";
// import SubmissionForm from "./SubmissionForm";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

const steps = ["Shipping Address", "Payment details"];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [transactionIsFinished, setTransactionIsFinished] = useState(false);

    const classes = useStyles();
    const history = useHistory();
   

    useEffect(()=>{
        const generateToken = async()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log(token);
                setCheckoutToken(token);
            }catch(error){
               history.pushState('/');
            }
        };
        generateToken();
    }, [cart]);   

   
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const previousStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);


    const next = (data)=>{
        setShippingData(data);

        nextStep();
    };

    const timeOut = () =>{
        setTimeout(()=>{
           setTransactionIsFinished(true);
        }, 3000);
    }


    let ConfirmationArea = () => order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : transactionIsFinished ? (
        <>
        <div>
          <Typography variant="h5">Thank you for your purchase!</Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
        ): (
            <div className={classes.spinner}>
            <CircularProgress />
            </div>
        );
    
      if (error) {
       
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button" >Back to home</Button>
          </>
      
      }

        const SubmissionForm = () =>( activeStep === 0 
                ? <AddressForm checkoutToken={checkoutToken} next={next}/>  
                : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} previousStep={previousStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeOut={timeOut}/>);

    return(
        <React.Fragment>
            <CssBaseline />
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
                    {activeStep === steps.length ? <ConfirmationArea /> : checkoutToken && <SubmissionForm />}
                </Paper>

            </main>
        </React.Fragment>

    )
}

export default Checkout;