export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
};

// export const addToCart = (product, cart, quantity, indexVariant, indexSize) => {
//   const check = cart.findIndex(
//     (item) =>
//       item._id === product._id &&
//       item.indexVariant === indexVariant &&
//       item.indexSize === indexSize
//   );

//   if (check < 0) {
//     return {
//       type: "ADD_CART",
//       payload: [...cart, { ...product, quantity, indexVariant, indexSize }],
//     };
//   } else {
//     cart[check].quantity += quantity;
//     return {
//       type: "ADD_CART",
//       payload: cart,
//     };
//   }
// };

// export const decrease = (data, _id, indexVariant, indexSize) => {
//   const newData = [...data];
//   newData.map((item) => {
//     if (
//       item._id === _id &&
//       item.indexVariant === indexVariant &&
//       item.indexSize === indexSize
//     ) {
//       item.quantity -= 1;
//     }
//   });

//   return { type: "ADD_CART", payload: newData };
// };

// export const increase = (data, _id, indexVariant, indexSize) => {
//   const newData = [...data];
//   newData.map((item) => {
//     if (
//       item._id === _id &&
//       item.indexVariant === indexVariant &&
//       item.indexSize === indexSize
//     ) {
//       item.quantity += 1;
//     }
//   });

//   return { type: "ADD_CART", payload: newData };
// };

// export const deleteFromCart = (cart, _id, indexVariant, indexSize) => {
//   const check = cart.findIndex(
//     (item) =>
//       item._id === _id &&
//       item.indexVariant === indexVariant &&
//       item.indexSize === indexSize
//   );
//   const newData = cart.filter(function (value, index, arr) {
//     return index !== check;
//   });
//   return { type: "ADD_CART", payload: newData };
// };
