"use server";

import { endpoints } from "@/app/common";
import { cookies } from "next/headers";
import api from "../api";
import { userCache } from "./cache";
import { METHODS } from "@/app/constants";

export const getCurrentUser = async () => {
  const id = cookies()?.get("id")?.value;
  const response = await api.query(
    endpoints.user.userById(id),
    userCache.tag.userById(id)
  );
  return response;
};

export const revalidateCurrentUser = async () => {
  console.log("Revalidating user", cookies()?.get("id")?.value);
  const id = cookies()?.get("id")?.value;
  revalidateTag(userCache.tag.userById(id));
};

export const deleteUser = async (id, data) => {
  const result = await api.mutation(
    endpoints.user.deleteuser(id),
    data,
    METHODS.DELETE
  );
  return result;
};
