import {Checkout} from "./Checkout";
import {render, screen} from '@testing-library/react'

enum selectors {
    checkout = 'checkout',
    checkoutTotal = 'checkout-total',
    checkoutItems = 'checkout-items',
    product = 'product-checkout-summary'
}

describe('Checkout:', () => {
    const products = [
        {
            id: 1,
            name: "Burger",
            category: "Burgers",
            description: "A Cheese Burger",
            price: 600,
            image: ""
        },
        {
            id: 1,
            name: "Chips",
            category: "Chips",
            description: "Some Chips",
            price: 250,
            image: ""
        }
    ]
    it('lists no products where there are 0 products in the list', () => {
        render(<Checkout products={[]} clearBasket={jest.fn()}/>);
        expect(screen.queryAllByTestId(selectors.product)).toHaveLength(0);
    });

    it('lists 2 products where there are 2 products in the list', () => {
        render(<Checkout products={products} clearBasket={jest.fn()}/>);
        expect(screen.queryAllByTestId(selectors.product)).toHaveLength(2);
    });

    it('correctly calculates the total price', () => {
        render(<Checkout products={products} clearBasket={jest.fn()}/>);
        expect(screen.getByTestId(selectors.checkoutTotal)).toHaveTextContent("Total: £8.50");
    });

    it('correctly lists total items amount', () => {
        render(<Checkout products={products} clearBasket={jest.fn()}/>);
        expect(screen.getByTestId(selectors.checkoutItems)).toHaveTextContent("2 Items");
    });
});