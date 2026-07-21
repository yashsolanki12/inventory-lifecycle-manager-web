import { syncProduct } from "../../api/products";
import { useCurrentShopDomain } from "../../utils/helper";

const ProductPage = () => {
  const shopDomain = useCurrentShopDomain();

  const syncAllProduct = async () => {
    try {
      const response = await syncProduct(shopDomain);
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
