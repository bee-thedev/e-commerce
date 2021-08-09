import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Menu, ManuItem, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import DevBee from "../../Images/DevBee.png";
import useStyles from "./NavigationbarStyle";
import { Link, useLocation } from "react-router-dom";


const Navigationbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return(
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar >
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={DevBee} alt="Bee-TheDev" height="25px" className={classes.image} />
                        Bee-TheDev
                    </Typography>

                <div className={classes.grow} />
                {location.pathname === "/" && (
                <div classeName={classes.button} >
                    <IconButton component={Link} to="/cart" aria-label="Cart item.." color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>)} 
                </Toolbar>
            </AppBar>
        </React.Fragment>
        )
}
                

export default Navigationbar;

