import { IOrderCreate } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const createOrder = async (data: IOrderCreate) => {
  const response = await fetch(`${BASE_URL}/orders/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const checkout = async () => {
  try {
    // Fetch the session ID from your server
    const response = await fetch(`${BASE_URL}/orders/checkout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.error || "Checkout failed");
    }

    // Redirect to the Stripe checkout with the received session ID
    window.location.href = responseBody.url;
  } catch (error) {
    console.error(error);
    // Handle errors, e.g., show an error message to the user
  }
};
