import { Link } from 'react-router-dom';
import slugify from 'slugify';

import useCart from '../../hooks/useCart';
import Button from '../Button/Button';
import { Container } from './Card.styled';

type CardProps = {
    id: number;
    category: string;
    name: string;
    price: number;
    description: string;
    thumbnail: string;
};

const Card = ({ info }: { info: CardProps }) => {
    const cart = useCart();
    const item = cart?.cartData?.itemsOrdered.find((item) => item.id === info.id);
    const quantityOrdered = item ? item.quantity : 0;

    return (
        <Container>
            <Link to={`/product/${info.id}/${slugify(info.name).toLowerCase()}`}>
                <img src={info.thumbnail} alt={info.name} />
            </Link>
            <Button
                quantity={quantityOrdered}
                buttonHandler={cart?.handleCart!}
                id={info.id}
                component="card"
            />
            <h3>${info.price.toFixed(2)}</h3>
            <span>{info.name}</span>
        </Container>
    );
};

export default Card;
