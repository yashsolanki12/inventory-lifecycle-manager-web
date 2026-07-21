import { syncProduct } from "../api/products";

export const ProductPage = () => {
  const syncAllProduct = async () => {
    try {
      const response = await syncProduct();
      console.log("res", response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>This is products page</h2>
      <button onClick={syncAllProduct}>Sync product</button>
    </>
  );
};

export default ProductPage;
