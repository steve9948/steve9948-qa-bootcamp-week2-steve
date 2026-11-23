// a simple function that calculates the area of a rectangle
function calculateArea(width: number, height: number): number {
    return width * height;
}
// call the function with width and height to demonstrate its functionality
const area = calculateArea(5, 10);
// log the area to the console
console.log(`The area is: ${area}`); // Output: The area is: 50


// a simple function that calculates the tax based on the amount and tax year
function calculateTax(amount: number, taxYear: 2026): number {
    // if the tax year is less than 2027, apply a tax rate of 20%, otherwise apply a tax rate of 30%
    return taxYear < 2027 ? amount * 1.2 : amount * 1.3;
}
// call the function with amount and tax year to demonstrate its functionality
const tax = calculateTax(100, 2026);
console.log(`The tax is: ${tax}`); // Output: The tax is: 120