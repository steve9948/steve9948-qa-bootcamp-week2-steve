// Optional chaining allows you to safely access deeply nested properties of an object without having to check if each reference in the chain is null or undefined.
// The optional chaining operator (?.) short-circuits and returns undefined if the value before it is null or undefined, preventing runtime errors.
type Customer = { birthday?: Date };
// The getCustomer function returns a Customer object or null based on the provided id.
function getCustomer(id: number): Customer | null {
    // If the id is 0, return null; otherwise, return a Customer object with a birthday property set to the current date.
  return id === 0 ? null : { birthday: new Date() };
}
console.log(getCustomer(0)?.birthday?.getFullYear()); // undefined, no crash