
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './cartItems.css';

const Cart = () => {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.storeSlice);
    const products = productsState.products;
      console.log('=====>', products)
    const deleteFromCart = (productID) => {
        const productToDelete = productsState.products.splice(productID, 1)

    }

  return (products.map(({ name, price, imageUrl, count }) => (
    <div className='cart-item' key={name}>
          <img src={imageUrl} alt='wine bottle' />
          <div classname='item-details'>
          <p className='name'>{name}</p>
          <p className='price'>{price * count || 1} kr</p>
              < FontAwesomeIcon icon={faTrash} className="userIcons" onClick={() => deleteFromCart(products)} />
            
          </div>

        </div>
  ))
    
        

      
  )

}
export default Cart;
