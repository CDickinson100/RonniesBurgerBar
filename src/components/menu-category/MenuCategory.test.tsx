import {MenuCategory} from "./MenuCategory";
import {render, screen} from '@testing-library/react'

enum selectors {
    product = 'product'
}

describe('MenuCategory:', () => {
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
            id: 2,
            name: "Burger",
            category: "Burgers",
            description: "A Cheese Burger",
            price: 600,
            image: ""
        },
        {
            id: 3,
            name: "Chips",
            category: "Sides",
            description: "Some Chips",
            price: 250,
            image: ""
        }
    ]

    it.each([
        ["Burgers", 2],
        ["Sides", 1],
        ["Drinks", 0]
    ])("Gives %s as a category, returns %p", (category: string, outcome: number)=>{
            render(<MenuCategory category={category} products={products} addProduct={jest.fn()}/>);
        expect(screen.queryAllByTestId(selectors.product)).toHaveLength(outcome);
    });
});