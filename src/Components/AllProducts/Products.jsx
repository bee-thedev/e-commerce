import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./EachProduct/Product";


// const products=[
//     {id:1,title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 1090.95,
//     description: "Your perfect pack " ,
//     category:   "men's clothing",
//     image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"},

//     {id:2, title:"Mens Casual Premium Slim Fit T-Shirts ",price: 2200.3,
//     description:"Slim-fitting style",
//     category:"men's clothing",
//     image:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"},

//     {id:3, title:"Mens Cotton Jacket", price: 5500.99,
//     description:"great outerwear jackets",
//     category:"men's clothing",
//     image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"},
// ];



const Products = ({products, onAddToCart}) => {
    return(
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}

        </Grid>
    </main>
    )
};

export default Products;

      