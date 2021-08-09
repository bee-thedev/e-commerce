import  React from "react";
import {Container, Typography, Button, Grid} from "@material-ui/core";
import useStyles from "./ShoppingCartStyle";
import CartItem from "./CartItem/CartItem";
import {Link} from "react-router-dom";
// or you can simply say cart.list_items.length===0
    // so if cart is empty ...means 0 >> is falsy so !0>>> is true

const ShoppingCart =({cart,handleTheCartQuantity,handleRemoveFromCart,emptyTheCart}) =>{

    // const isEmpty = !cart.list_items.length;
    const classes = useStyles();

    
    const CartIsEmpty = () =>(
        <Typography variant="subtitle1">Your cart is empty, 
                <Link to="/" className={classes.link}>fill it up with some items!</Link>
        </Typography>
    );

    const CartIsFull = () =>(
        <React.Fragment>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQuantity={handleTheCartQuantity} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>

            <div className={classes.cardDetails}>
                    <Typography variant="h6">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>

                    <div>
                        <Button className={classes.emptyButton} type="button" variant="contained" size="large" color="secondary" onClick={emptyTheCart}> Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} type="button" variant="contained" size="large" color="primary">Checkout</Button>
                    </div>
            </div>
        </React.Fragment>
    );


    if(!cart.line_items)  return "Loading ...";
    
    return(
        <Container>
            <div className={classes.toolbar}/>
          <Typography className={classes.title} variant="h3" gutterBottom>Shopping Cart!</Typography>
              { !cart.line_items.length ? <CartIsEmpty /> : <CartIsFull /> }
        </Container>
    );
}

export default ShoppingCart;
             