import React, { createContext, useContext, useEffect, useState } from 'react';
import './CartItem.css'; 
import { exportPlantList } from './ProductList';

const CartItem = () => {
  const [plantInfo, setPlantInfo] = useState([])
  const [showCart, setShowCart] = useState(false)
  var cart = useContext(exportPlantList)

  
  // console.log(plantInfo)
  useEffect(() => {
    const plantsArray = []
    cart.map((product, productID) => {
       plantsArray.push({id: productID, name: product.name, quantity: 0})
    })
    setPlantInfo(plantsArray)
  }, [])
  
  function getEachProductQuantity(id){
    if(plantInfo.length !== 0){
      //console.log(plantInfo)
      const product = plantInfo.find(plant => plant.id === id)
      return product.quantity
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

  const handleRemove = (id) => {
    cart = cart.splice(id, 1)
    setPlantInfo(plantInfo.splice(id, 1))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (id) => {
    if(cart.length !== 0 && plantInfo.length !== 0){
      const result = plantInfo.find(product => product.id === id)
      return result.quantity * Number(cart[id].cost.slice(1))
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
                    getEachProductQuantity(id)
                  }</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(id)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(id)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
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


