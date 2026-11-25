// Optional chaining allows you to safely access deeply nested properties of an object without having to check if each reference in the chain is null or undefined.
// The optional chaining operator (?.) short-circuits and returns undefined if the value before it is null or undefined, preventing runtime errors.


// Example of using optional chaining with an object
let employee: { id: number; name?: string } = { id: 1 };
console.log(employee.name); // undefined, no crash

employee.name = "stephen";

console.log(employee.name); 

console.log(employee.name?.toUpperCase(), employee.id); // Output: STEPHEN 1