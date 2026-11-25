// TypeScript allows you to define union types using the `|` operator. A union type represents a value that can be one of several types. This is useful when a variable can hold multiple types of values, providing flexibility while still maintaining type safety.

// a simple function that takes a union type of string or number
function show(value: string | number) {
    // check the type of the value and perform different actions based on the type
    //typeof is a safe way to check the type of a variable in TypeScript, and it works well with union types.
  if (typeof value === "string") console.log(value.toUpperCase());
  // if the value is a number, format it to two decimal places
  else console.log(value.toFixed(2));
}
// call the function with a string and a number to demonstrate its functionality
show("abc");
show(3.14159);