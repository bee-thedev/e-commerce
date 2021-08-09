import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { InputLabel, Select, MenuItem, Button, Typography,Grid } from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import FormFieldComponent from "./FormFieldComponent";
import {commerce} from "../../Library/Commerce";

const AddressForm = ({checkoutToken, next}) =>{

    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    // const countries = Object.entries(shippingCountries).map(([code, name])=>({id: code, label: name}));
    //OR as described in first grid
    const options = shippingOptions.map((shippingOption) => ({id: shippingOption.id, label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`}))
    
    console.log(shippingOptions);
    const fetchShippingCountries = async(checkoutTokenID) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }
    const fetchShippingSubdivisions = async(countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
    
    const fetchShippingOptions =async(checkoutTokenID, country, region= null) =>{
            const options = await commerce.checkout.getShippingOptions(checkoutTokenID, {country, region});
            setShippingOptions(options);
            setShippingOption(options[0].id)
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    },[])
   
    useEffect(() =>{
       if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
    },[shippingCountry])

    useEffect(() =>{
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return(
        <React.Fragment>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>

            <FormProvider {...methods}>
                <form onSubmit= {methods.handleSubmit((data)=>next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormFieldComponent required name="fname" label="First Name"/>
                        <FormFieldComponent required name="lname" label="Last Name"/>
                        <FormFieldComponent required name="address" label="Address"/>
                        <FormFieldComponent required name="zipcode" label="Zip/Postal code"/>
                        <FormFieldComponent required name="email" label="Email"/>
                        <FormFieldComponent required name="contactno" label="Contact Number"/>
                        <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Country </InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([code, name])=>({id: code, label: name})).map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                    </MenuItem>
                                ))} 
                                  
                                </Select>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Subdivision</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {Object.entries(shippingSubdivisions).map(([code, name])=>({id: code, label: name})).map((subdivision)=>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                    </MenuItem>
                                ))} 
                                   
                                </Select>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <InputLabel> Shipping Options </InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                    </MenuItem>
                                ))} 
                                </Select>
                        </Grid>

                    </Grid>

                    <br />
                    <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </React.Fragment>
    );
};

export default AddressForm;