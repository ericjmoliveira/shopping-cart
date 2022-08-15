import { createContext } from 'react';

import Cart from '../../types/Cart';
import List from '../../types/List';

interface CartInterface {
    cartData: Cart | null;
    loading: boolean;
    userLists: List[] | null;
    categoryClicked: string;
    handleCategoryClicked(categoryId: string): void;
    handleCart(productId: number, add?: boolean, removeAll?: boolean): void;
    createList(): void;
    deleteList(id: string): void;
    clearCart(): void;
}

const CartContext = createContext<CartInterface | null>(null);

export default CartContext;
