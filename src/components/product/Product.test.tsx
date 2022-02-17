import {Product} from "./Product";
import {fireEvent, render, screen} from '@testing-library/react'

enum selectors {
    product = 'product',
    purchase = 'purchase',
    heading = 'name-price'
}

describe('Product:', () => {
    it('calls the function when the purchase button is clicked', () => {
        const purchaseFunction = jest.fn();
        const product = {
            id: 1,
            name: "Burger",
            category: "Burgers",
            description: "A Cheese Burger",
            price: 600,
            image: ""
        }
        render(<Product product={product} addProduct={purchaseFunction}/>);

        fireEvent.click(screen.getByTestId(selectors.purchase));
        expect(purchaseFunction).toBeCalled();
    });
    it('has the correct price and name in the heading', () => {
        const product = {
            id: 1,
            name: "Burger",
            category: "Burgers",
            description: "A Cheese Burger",
            price: 650,
            image: ""
        }
        render(<Product product={product} addProduct={jest.fn()}/>);

        expect(screen.getByTestId(selectors.heading)).toHaveTextContent("Burger (£6.50)");
    });
});