export const validateProduct = (product) => {
  if (product.category === null) return "Danh mục sản phẩm cần điền";
  if (product.title === null) return "Tên sản phẩm cần điền";
  if (product.price === null) return "Giá sản phẩm cần điền";
  if (Number(product.price) < 0) return "Giá sản phẩm số dương";
  if (product.variant.length === 0) return "Cần thêm biến thể sản phẩm";

  for (let i = 0; i < product.variant.length; i++) {
    if (product.variant[i].img === "")
      return `Cần thêm ảnh cho biến thể thứ ${i + 1}`;
    if (product.variant[i].title === "")
      return `Cần thêm tên cho biến thể ${i + 1}`;
  }

  return 1;
};
