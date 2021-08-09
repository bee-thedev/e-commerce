import React,{useState, useEffect} from "react";
import {Products,Navigationbar, ShoppingCart, Checkout} from "./Components/ComponentIndex";
import {commerce} from "./Library/Commerce";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



function App() {

  const [products, setNewProducts] = useState([]);

  const [cart, setTheCart] = useState({});
  
  const getProduct = async() => {
    const {data} = await commerce.products.list();

    setNewProducts(data);
  };

  const getCart = async () => {
    const cart = await commerce.cart.retrieve();
    setTheCart(cart);
  };

  //Creating filling card..
  //T fill in the card we need ..product id and how many (quantity)
  //This in term will give the item

  const handleTheCart = async(productId, quantity) =>{
    const   itemToCart = await commerce.cart.add(productId, quantity);
    
    setTheCart(itemToCart.cart);
  }

  const handleTheCartQuantity = async (productId, quantity) =>{
    const quantityInCart = await commerce.cart.update(productId, {quantity});
    setTheCart(quantityInCart.cart)
  }

  const handleRemoveFromCart = async (productId) =>{
    const removeFromCart = await commerce.cart.remove(productId);
    setTheCart(removeFromCart.cart)
  }

  const emptyTheCart = async () =>{
    const emptyTheCart = await commerce.cart.empty();
    setTheCart(emptyTheCart.cart)
  }
  

  useEffect(()=>{
    getProduct();
    getCart();
  }, [])
  
  console.log(cart);
  return (
    <Router>
    <div className="App">
      <h1> Bee-TheDev Merch</h1>
      <Navigationbar totalItems={cart.total_items}/>
      <Switch>
            
            <Route exact path="/">
            <Products products={products} onAddToCart={handleTheCart}/> 
            </Route>
      
            <Route exact path="/cart">
            <ShoppingCart 
            cart={cart}
            handleTheCartQuantity={handleTheCartQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            emptyTheCart={emptyTheCart}
            />
            </Route>

            <Route exact path="/checkout">
              <Checkout cart={cart}/>
            </Route>
            
      </Switch>
    </div>
    </Router>
  );
}

export default App;
