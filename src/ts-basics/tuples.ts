// Tuples in TypeScript are a special type of array that allows you to define an array with a fixed number of elements, where each element can have a different type. They are useful when you want to represent a collection of values with different types in a specific order.
// In this example, we define a tuple type that consists of a string and a number. We then create a variable of that tuple type and assign it values. Finally, we access the elements of the tuple using their index.
let user: [string, number] = ["Stephen", 28]; // Tuple type with a string and a number
// Accessing elements of the tuple
console.log(user[0]); // Output: Stephen
// Accessing the second element of the tuple
console.log(user[1]); // Output: 28
// You can also use the tuple in a function to return multiple values of different types
function getUserInfo(): [string, number] {
  return ["Stephen", 28]; // Returning a tuple from the function
}
let userInfo = getUserInfo(); // Calling the function and storing the returned tuple
console.log(userInfo[0]); // Output: Stephen
console.log(userInfo[1]); // Output: 28
// You can also use the tuple in a function to return multiple values of different types
// function getUserInfo(): [string, number] {
//   return ["Stephen", 28]; // Returning a tuple from the function
// }
console.log(user[0], user[1]); // Output: Stephen 28