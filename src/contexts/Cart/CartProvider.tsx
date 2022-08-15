import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CartContext from './CartContext';
import Cart from '../../types/Cart';
import List from '../../types/List';
import { getProduct } from '../../data/inventory';

const CartProvider = ({ children }: { children: JSX.Element }) => {
    const initialState = { total: 0.0, itemsQuantity: 0, itemsOrdered: [] };
    const [cartData, setCartData] = useState<Cart>(initialState);
    const [loading, setLoading] = useState(true);
    const [userLists, setUserLists] = useState<List[] | null>([]);
    const [categoryClicked, setCategoryClicked] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const cartData = localStorage.getItem('cartData');
        const userLists = localStorage.getItem('userLists');

        if (cartData) setCartData(JSON.parse(cartData));
        if (userLists) setUserLists(JSON.parse(userLists));

        setLoading(false);
    }, []);

    const handleCart = (productId: number, add: boolean = true, removeAll: boolean = false) => {
        if (cartData) {
            const newCartData = { ...cartData };

            const item = newCartData.itemsOrdered.find((item) => item.id === productId);

            if (add) {
                if (!item) {
                    const newOrder = getProduct(productId);

                    if (newOrder) {
                        newCartData.itemsOrdered.push({
                            id: newOrder.id,
                            thumbnail: newOrder.thumbnail,
                            name: newOrder.name,
                            price: newOrder.price,
                            quantity: 1,
                            subTotal: newOrder.price
                        });

                        newCartData.total += newOrder.price;
                    }
                } else {
                    for (const item of newCartData.itemsOrdered) {
                        if (item.id === productId) {
                            item.quantity++;
                            item.subTotal = item.quantity * item.price;
                            newCartData.total += item.price;
                        }
                    }
                }

                newCartData.itemsQuantity++;
            } else {
                for (const item of newCartData.itemsOrdered) {
                    if (item.id === productId) {
                        if (removeAll) {
                            newCartData.itemsQuantity -= item.quantity;
                            newCartData.total -= item.price * item.quantity;
                            item.quantity = 0;
                        } else {
                            newCartData.itemsQuantity--;
                            item.quantity--;
                            item.subTotal = item.quantity * item.price;
                            newCartData.total -= item.price;
                        }

                        if (newCartData.itemsQuantity <= 0) newCartData.total = 0.0;

                        if (item.quantity === 0) {
                            newCartData.itemsOrdered = newCartData.itemsOrdered.filter(
                                (item) => item.id !== productId
                            );
                        }
                    }
                }
            }

            setCartData(newCartData);
            localStorage.setItem('cartData', JSON.stringify(newCartData));
        }
    };

    const handleCategoryClicked = (categoryId: string) => setCategoryClicked(categoryId);

    const createList = () => {
        const newUserLists = userLists?.map((list) => list);

        const newList = {
            id: uuidv4(),
            createdAt: new Date().toString(),
            cartData
        };

        newUserLists?.unshift(newList);
        setUserLists(newUserLists!);
        localStorage.setItem('userLists', JSON.stringify(newUserLists));
        alert('New list added!');
        navigate('/lists');
        clearCart();
    };

    const deleteList = (id: string) => {
        const newUserLists = userLists?.filter((list) => list.id !== id);

        setUserLists(newUserLists!);
        localStorage.setItem('userLists', JSON.stringify(newUserLists));
    };

    const clearCart = () => {
        localStorage.removeItem('cartData');
        setCartData(initialState);
    };

    return (
        <CartContext.Provider
            value={{
                cartData,
                loading,
                userLists,
                categoryClicked,
                handleCategoryClicked,
                handleCart,
                createList,
                deleteList,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
