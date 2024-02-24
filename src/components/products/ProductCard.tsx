import { useProductContext } from "@/contexts/ProductContext";
import ProductImageCarousel from "./ProductImageCarousel";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/currencyFormatter";
import { convertToStars } from "@/utils/aveageRating";
import { cn } from "@/lib/utils";
import SaleBadge from "./SaleBadge";

const ProductCard = () => {
  const { allProduct } = useProductContext();

  return (
    <div className="grid grid-cols-4 space-y-10 my-20">
      {allProduct?.map((item) =>
        item.products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="flex flex-col relative items-start justify-start space-y-4"
          >
            <ProductImageCarousel images={product.images} />
            <div>
              <p className="text-primary font-semibold">{product.brand}</p>
            </div>
            {product.offerPrice && (
              <div className="absolute top-0">
                <SaleBadge
                  price={product.price}
                  salePrice={product.offerPrice}
                />
              </div>
            )}
            <p className="max-w-[240px] line-clamp-2">{product.name}</p>
            <div className="flex items-start justify-start gap-5">
              {product.offerPrice && (
                <p className="font-medium text-primary">
                  {formatCurrency(product.offerPrice)}
                </p>
              )}
              <p
                className={cn(
                  "font-medium",
                  product.offerPrice && "line-through"
                )}
              >
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="flex items-start justify-start gap-2">
              <p>{convertToStars(product.averageRating)}</p>
              <p>{product.reviews.length > 0 && product.reviews.length}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductCard;
