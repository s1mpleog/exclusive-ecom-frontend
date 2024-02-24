import * as productService from "@/api/product.service";
import { IProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type ProductContextType = {
  allProduct: IProduct[] | undefined;
  quantity: number;
  handleCart: () => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isError } = useQuery<IProduct[], Error>({
    queryFn: productService.getAllProducts,
    queryKey: ["all-products"],
  });

  const [allProduct, setAllProduct] = useState<IProduct[] | undefined>(
    undefined
  );

  const [quantity, setQuantity] = useState<number>(0);

  const handleCart = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    if (data && !isError) {
      setAllProduct((prev) => {
        if (Array.isArray(data)) {
          return prev ? [...prev, ...data] : data;
        } else {
          return prev ? [...prev, data] : [data];
        }
      });
    }
  }, [data, isError]);

  return (
    <ProductContext.Provider value={{ allProduct, quantity, handleCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};
