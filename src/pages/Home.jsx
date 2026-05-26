import { useEffect, useState } from "react";
import { subscribeProducts } from "../services/productService";
import { useSearchStore } from "../store";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchTerm = useSearchStore((state) => state.searchTerm);

  useEffect(() => {
    const unsubscribe = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturedProducts
        products={products}
        loading={loading}
        searchTerm={searchTerm}
      />
    </>
  );
}

export default Home;
