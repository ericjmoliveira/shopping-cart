import { Link } from 'react-router-dom';
import slugify from 'slugify';

import * as Styles from './styles';
import emptyCart from '../../images/empty-cart.svg';
import useCart from '../../hooks/useCart';

const Orders = () => {
    const cart = useCart();
    const noLists = cart?.userLists?.length === 0;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    };

    const handleDelete = (id: string) => {
        const response = confirm('Are you sure you want to delete this list?');

        if (!response) return;

        cart?.deleteList(id);
    };

    if (cart?.loading) return <></>;

    return (
        <Styles.Container>
            <h2>My Lists</h2>
            {noLists ? (
                <Styles.Empty>
                    <img src={emptyCart} alt="Empty cart" />
                    <h3>No new lists</h3>
                    <p>Check back after your next shopping trip!</p>
                    <Link to="/">Shop now</Link>
                </Styles.Empty>
            ) : (
                <div>
                    {cart?.userLists?.map((list) => (
                        <Styles.List key={list.id}>
                            <p>
                                <strong>
                                    List ID: {list.id}
                                    <br />
                                    Added at: {formatDate(list.createdAt)}
                                    <br />
                                    <button onClick={() => handleDelete(list.id)}>
                                        Delete list
                                    </button>
                                </strong>
                            </p>
                            {list.cartData.itemsOrdered.map((item) => (
                                <Styles.Item key={item.id}>
                                    <Link
                                        to={`/product/${item.id}/${slugify(
                                            item.name
                                        ).toLowerCase()}`}
                                    >
                                        <img src={item.thumbnail} alt={item.name} />
                                        <span>{item.quantity}</span>
                                        <div>
                                            <span>{item.name}</span>
                                            <strong>(${item.price.toFixed(2)}/ea)</strong>
                                        </div>
                                    </Link>
                                    <span>
                                        <strong>${item.subTotal.toFixed(2)}</strong>
                                    </span>
                                </Styles.Item>
                            ))}
                            <Styles.Total>
                                <h3>Total</h3>
                                <strong>${list.cartData.total.toFixed(2)}</strong>
                            </Styles.Total>
                        </Styles.List>
                    ))}
                </div>
            )}
        </Styles.Container>
    );
};

export default Orders;
