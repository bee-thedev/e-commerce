import React,{useState} from "react";
import { InputLabel, Select, MenuItem, Button, Typography,Grid } from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import FormFieldComponent from "./FormFieldComponent";
import {commerce} from "../../Library/Commerce";

const AddressForm = () =>{

    const methods = useForm();

    const [shippingCountires, setShippingCountries] = useState([]);
    const [shippingCountiry, setShippingCountry] = useState('');

    const [shippingDiscounts, setShippingDiscounts] = useState([]);
    const [shippingDiscount, setShippingDiscount] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    
    const fetchShippingCountries = async(checkoutTokenID) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID);

        setShippingCountries(countries);
    }


   
    
    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>

            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormFieldComponent required name="fname" label="First Name"/>
                        <FormFieldComponent required name="lname" label="Last Name"/>
                        <FormFieldComponent required name="address" label="Address"/>
                        <FormFieldComponent required name="zipcode" label="Zip/Postal code"/>
                        <FormFieldComponent required name="email" label="Email"/>
                        <FormFieldComponent required name="contactno" label="Contact Number"/>
                        {/* <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Country </InputLabel>
                                <Select value={} fullWidth onChange={}>
                                    <MenuItem key={} value={}>
                                            Select Me
                                    </MenuItem>
                                </Select>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Subdivision</InputLabel>
                                <Select value={} fullWidth onChange={}>
                                    <MenuItem key={} value={}>
                                            Select Me
                                    </MenuItem>
                                </Select>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Options </InputLabel>
                                <Select value={} fullWidth onChange={}>
                                    <MenuItem key={} value={}>
                                            Select Me
                                    </MenuItem>
                                </Select>
                        </Grid> */}

                    </Grid>
                </form>
            </FormProvider>
        </React.Fragment>
    );
};

export default AddressForm;