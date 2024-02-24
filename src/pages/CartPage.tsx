import * as cartService from "@/api/cart.service";
import { ICart } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import EmptyCart from "@/assets/images/empty-cart.png";
import React from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { formatCurrency } from "@/utils/currencyFormatter";

const CartPage = () => {
  const {
    data: cart,
    isError,
    isFetching,
  } = useQuery<ICart>({
    queryKey: ["add-cart"],
    queryFn: cartService.getCartItems,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cartService.deleteFromCart,
    mutationKey: ["delete-cart"],

    onSuccess: async () => {
      toast.success("product deleted from cart");
      await queryClient.invalidateQueries({ queryKey: ["add-cart"] });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (id: string | undefined) => {
    mutation.mutateAsync(id);
  };

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
    <main className="py-10">
      {cart?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={EmptyCart} alt="hippo" className="h-[600px]" />
          <p className="text-2xl font-bold">Oops your cart is empty</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex items-center bg-white shadow-lg py-5 px-10 rounded-md justify-between">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cart?.items.map((item) => (
            <div className="flex shadow-lg py-2 px-5 items-center space-y-6 justify-between">
              <div className="flex my-6 gap-2">
                {item.products.map((product) => (
                  <React.Fragment key={product.name}>
                    <div className="relative">
                      <img
                        src={product.images[0]?.url}
                        className="w-20 h-20 object-contain"
                        alt=""
                      />
                    </div>
                    <div
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer right-0"
                    >
                      <MdDelete />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              {item.products.map((item) => (
                <div key={item.price}>
                  {item.offerPrice ? (
                    <p>{formatCurrency(item.offerPrice)}</p>
                  ) : (
                    <p>{formatCurrency(item.price)}</p>
                  )}
                </div>
              ))}
              <div>{item.quantity}</div>
              <div>{formatCurrency(item.totalAmount)}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CartPage;
