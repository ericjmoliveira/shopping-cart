import { createContext } from 'react';

import Cart from '../../types/Cart';

interface CartInterface {
    cartData: Cart | null;
    categoryClicked: string;
    handleCategoryClicked(categoryId: string): void;
    handleCart(productId: number, add?: boolean, removeAll?: boolean): void;
    clearCart(): void;
}

const CartContext = createContext<CartInterface | null>(null);

export default CartContext;
