import { Link, useParams } from 'react-router-dom';

import useCart from '../../hooks/useCart';
import Button from '../../components/Button/Button';
import { getProduct } from '../../data/inventory';
import * as Styles from './styles';

const Product = () => {
    const { id } = useParams();
    const product = getProduct(parseInt(id!));

    const cart = useCart();
    const item = cart?.cartData?.itemsOrdered.find((item) => item.id === parseInt(id!));
    const quantityOrdered = item ? item.quantity : 0;

    return (
        <Styles.Container>
            <Styles.Image>
                <img src={product.thumbnail} alt={product.name} />
            </Styles.Image>
            <Styles.Info>
                <h2>{product.name}</h2>
                <h3>${product.price.toFixed(2)}</h3>
                <Button
                    quantity={quantityOrdered}
                    buttonHandler={cart?.handleCart!}
                    id={parseInt(id!)}
                    component="product"
                />
                <p>{product.description}</p>
            </Styles.Info>
        </Styles.Container>
    );
};

export default Product;
