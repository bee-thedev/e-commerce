import React from "react";
import {Card, CardContent, CardActions, CardMedia,Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./ProductStyle";

const Product = ({product, onAddToCart}) => {
        const classes = useStyles();


     // This whole section is for single card/object   
      //callback function on onClick so that it doesnt immediately runs but..
                   // let it first add the item tehn add the items
        return(
            <div>
                <Card className={classes.root}>
                    <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
                   <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography variant="body2">
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
                   </CardContent>

                   <CardActions disableSpacing className={classes.cardActions}>
                  
                        <IconButton aria-label="Add to cart" onClick={() => onAddToCart(product.id, 1)}>
                            <AddShoppingCart />
                        </IconButton>
                   </CardActions>
                </Card>
            </div>
        )

}


export default Product;
