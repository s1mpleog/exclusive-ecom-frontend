import axios from "axios";
import { ILoginBodyType, IRegisterBody } from "@/types/types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const registerUser = async (data: IRegisterBody) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
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

export const verifyOTP = async (activation_code: unknown) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/users/activate`,
      {
        activation_code,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Response data:", res.data);
    if (res.data.success === false) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.error("Error in verifyOTP:", error);

    throw new Error("Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const loginUser = async (data: ILoginBodyType) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
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

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const refreshToken = async () => {
  const response = await fetch(`${BASE_URL}/users/refresh-token`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
