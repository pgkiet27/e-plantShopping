import React, { createContext, useContext, useEffect, useState } from 'react';
import './CartItem.css'; 
import { exportPlantList } from './ProductList';

const CartItem = () => {
  var cart = useContext(exportPlantList)

  const [plantInfo, setPlantInfo] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const plantsArray = []
    cart.map((product, productID) => {
       plantsArray.push({id: productID, name: product.name, quantity: 0})
    })
    setPlantInfo(plantsArray)
  }, [])
  
  function getEachProductQuantity(name){
    if(plantInfo.length !== 0 && cart.length !== 0){
      const product = plantInfo.find(plant => plant.name === name)
      if(product !== undefined)
        return product.quantity
      return 0  
    } 
  }

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    if(cart.length !== 0 && plantInfo.length !== 0){
      const prices = cart.map(product => product.cost)
      const quantity = plantInfo.map(plant => plant.quantity)
      const prices_number = prices.map(number => number.slice(1))
      const pricesAndQuantity = quantity.map((productQuantity, id) => productQuantity*prices_number[id])
      return pricesAndQuantity.reduce((accummulate, currentValue) => Number(accummulate) + Number(currentValue))
    }
  };

  const handleContinueShopping = () => {
    if(cart.length !== 0){
      console.log('test')
      setShowCart(true)
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (id) => {
    if(plantInfo.length !== 0){
      setPlantInfo(plants => {
        return plants.map(plant => {
          if(plant.id === id)
            plant.quantity = Number(plant.quantity) + 1
          return plant
        })
        
      })
    }
  };

  const handleDecrement = (id) => {
    if(plantInfo.length !== 0){
      setPlantInfo(plants => {
        return plants.map(plant => {
          if(plant.id === id && plant.quantity > 0)
            plant.quantity = Number(plant.quantity) - 1
          return plant
        })
      })
    }
  };

  var handleRemove = (name) => {
    const object = cart.find(plant => plant.name === name)
    const result = cart.indexOf(object)
    cart.splice(result, 1)
    
    setPlantInfo(plants => (
      plants.filter(plant => plant.name !== name)
    ))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (name, id) => {
    if(cart.length !== 0 && plantInfo.length !== 0){
      const result = plantInfo.find(product => product.name === name)
      return result.quantity * Number(cart.find(plant => plant.name === name).cost.slice(1))
    }
  };

  
  return (
    <PlantInCart.Provider value={showCart}>
      <div className="cart-container">
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
        <div>
          {cart.map((item, id) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(id)}>-</button>
                  <span className="cart-item-quantity-value">{  
                    getEachProductQuantity(item.name)
                  }</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(id)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item.name, id)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={() => handleContinueShopping()}>Continue Shopping</button>
          <br />
          <button className="get-started-button1" onClick={() => handleCheckoutShopping()}>Checkout</button>
        </div>
      </div>
    </PlantInCart.Provider>

  );
};

export default CartItem;
export const PlantInCart = createContext()


