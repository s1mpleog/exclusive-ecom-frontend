import HomeBanner from "@/components/HomeBanner";
import FlashSale from "@/components/products/FlashSale";
import ProductCard from "@/components/products/ProductCard";

export default function HomePage() {
  return (
    <div className="container mx-auto my-5">
      <HomeBanner />
      <FlashSale />
      <ProductCard />
    </div>
  );
}
