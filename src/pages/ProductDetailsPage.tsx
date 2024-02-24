import * as productService from "@/api/product.service";
import * as cartService from "@/api/cart.service";
import SingleDetailsPageCarousel from "@/components/products/details-page/SingleDetailsPageCarousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ISingleProduct } from "@/types/types";
import { convertToStars } from "@/utils/aveageRating";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const queryClient = useQueryClient();

  console.log(productId);

  const {
    data: product,
    isLoading,
    isError,
    isFetching,
  } = useQuery<ISingleProduct>({
    queryKey: ["single-product"],
    queryFn: () => productService.getProductById(productId),
  });

  const mutation = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: cartService.addToCart,

    onSuccess: async () => {
      toast.success("Product added to cart success");
      await queryClient.invalidateQueries({ queryKey: ["add-cart"] });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const addToCart = (id: string | undefined) => {
    mutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 container mx-auto my-10">
        <div className="">
          <SingleDetailsPageCarousel images={product?.product.images} />
        </div>
        <div className="space-y-5">
          <p className="font-semibold text-primary">{product?.product.brand}</p>
          <h3 className="text-xl font-semibold text-gray-800">
            {product?.product.name}
          </h3>
          <div className="flex items-start justify-start gap-3">
            {product?.product.offerPrice && (
              <p className="font-medium text-primary">
                {formatCurrency(product.product.offerPrice)}
              </p>
            )}
            <p
              className={cn(
                "font-medium",
                product?.product.offerPrice && "line-through"
              )}
            >
              {formatCurrency(product!.product.price!)}
            </p>
          </div>
          <div className="flex items-start justify-start gap-2">
            <p>{convertToStars(product!.product.averageRating)}</p>

            <p className="text-gray-700">
              {product!.product.reviews.length > 0 &&
                `(${product?.product.reviews.length} Reviews)`}
            </p>
          </div>
          <div className="border-t-2 py-4">
            <p>{product?.product.description}</p>
          </div>
          <div>
            <Button
              disabled={mutation.isPending}
              onClick={() => addToCart(productId)}
              className="w-full"
              size={"lg"}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
