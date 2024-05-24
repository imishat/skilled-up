"use server";

import { endpoints } from "@/app/common";
import { METHODS } from "@/app/constants";
import { cookies } from "next/headers";
import api from "../api";

export const logout = () => {
  cookies().delete("token");
  return true;
};

export const login = async data => {
  const response = await api.mutation(endpoints.auth.login, data, "POST");
  if (response?.success) {
    cookies().set("id", response?.data?.user?.id, {
      secure: false,
      sameSite: "lax",
    });
    cookies().set("token", response?.data?.token, {
      secure: false,
      sameSite: "lax",
    });
  }
  return response;
};

export const forgotPassword = async data => {
  const response = await api.mutation(
    endpoints.auth.forgotPassword,
    data,
    "POST"
  );
  return response;
};

export const resetPassword = async (payload, token) => {
  const response = await api.mutation(
    endpoints.auth.resetPassword(token),
    payload,
    "POST"
  );
  return response;
};

export const verifyAccount = async token => {
  const response = await api.mutation(
    endpoints.auth.verfiyAccount(token),
    {},
    "POST"
  );
  return response;
};

export const changePassword = async data => {
  const response = await api.mutation(
    endpoints.auth.changePassword,
    data,
    METHODS.PATCH
  );
  return response;
};

export const register = async data => {
  const response = await api.mutation(endpoints.auth.register, data, "POST");
  return response;
};
