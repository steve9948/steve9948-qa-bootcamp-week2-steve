// TypeScript allows you to create type aliases using the `type` keyword. A type alias gives a type a new name. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types.
// a simple type alias for this example
type Employee = { readonly id: number; name: string };
// The `readonly` modifier ensures that the `id` property cannot be changed after the object is created. This is useful for properties that should remain constant throughout the lifetime of an object.
const e: Employee = { id: 1, name: "Amina" };
console.log(e);