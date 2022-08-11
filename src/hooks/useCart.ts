import { useContext } from 'react';

import CartContext from '../contexts/Cart/CartContext';

const useCart = () => useContext(CartContext);

export default useCart;
