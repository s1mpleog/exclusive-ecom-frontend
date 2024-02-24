import { ICart } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const addToCart = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL}/carts/add/${id}`, {
    method: "POST",
    credentials: "include",
    body: id,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getCartItems = async () => {
  const response = await fetch(`${BASE_URL}/carts/all`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody as ICart;
};

export const deleteFromCart = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL}/carts/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
    body: id,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
