import { useEffect } from 'react';

import { inventory } from '../../data/inventory';
import Card from '../../components/Card/Card';
import useCart from '../../hooks/useCart';
import * as Styles from './styles';

const Home = () => {
    const cart = useCart();

    useEffect(() => {
        if (cart?.categoryClicked) {
            const categoryPosition = document.getElementById(cart.categoryClicked)!.offsetTop;
            window.scrollTo({ top: categoryPosition - 180, behavior: 'smooth' });
            cart.handleCategoryClicked('');
        }
    }, [cart?.categoryClicked]!);

    return (
        <Styles.Container>
            <h2 id="snacks">Snacks</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Snacks' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="beverages">Beverages</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Beverages' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="pantry">Pantry</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Pantry' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="meat-seafood">Meat & Seafood</h2>
            <Styles.Category>
                {inventory.map(
                    (item) =>
                        item.category === 'Meat & Seafood' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="fresh-produce">Fresh Produce</h2>
            <Styles.Category>
                {inventory.map(
                    (item) =>
                        item.category === 'Fresh Produce' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="deli">Deli</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Deli' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="frozen-food">Frozen Food</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Frozen Food' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="daily-eggs">Daily & Eggs</h2>
            <Styles.Category>
                {inventory.map(
                    (item) => item.category === 'Daily & Eggs' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
            <h2 id="household-essentials">Household Essentials</h2>
            <Styles.Category>
                {inventory.map(
                    (item) =>
                        item.category === 'Household Essentials' && (
                            <Card key={item.id} info={item} />
                        )
                )}
            </Styles.Category>
            <h2 id="personal-care">Personal Care</h2>
            <Styles.Category>
                {inventory.map(
                    (item) =>
                        item.category === 'Personal Care' && <Card key={item.id} info={item} />
                )}
            </Styles.Category>
        </Styles.Container>
    );
};

export default Home;
