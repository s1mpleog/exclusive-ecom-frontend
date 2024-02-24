import { IProduct, ISingleProduct } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${BASE_URL}/products/all`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody as IProduct[];
};

export const getProductById = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  console.log("SINGLE PRODUCT", responseBody);
  return responseBody as ISingleProduct;
};
