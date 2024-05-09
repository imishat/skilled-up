"use server";

import { endpoints } from "@/app/common";
import { METHODS } from "@/app/constants";
import { cookies } from "next/headers";
import api from "../api";
import { jobSeekerCache } from "./cache";

const getCurrentUserId = async () => {
  return await cookies()?.get("id")?.value;
};

// const currentUserId = cookies()?.get("id")?.value;

export const getJobSeekerProfileById = async (id = "") => {
  const userId = id || (await getCurrentUserId());
  const response = await api.query(
    endpoints.jobSeeker.jobSeekerById(userId),
    jobSeekerCache.tags.jobSeekerById(userId)
  );
  return response;
};

export const uplaodResume = async file => {
  const response = await api.mutation(
    endpoints.jobSeeker.uplaodResume,
    file,
    "PATCH",
    jobSeekerCache.tags.jobSeekerById(currentUserId)
  );
  return response;
};
export const uplodeVideo = async (video, thumbnail) => {
  const response = await api.mutation(
    endpoints.jobSeeker.uploadVideoResume,
    video,
    thumbnail,
    METHODS.PATCH
  );
  return response;
};

export const deleteVideoResume = async id => {
  const response = await api.mutation(
    endpoints.jobSeeker.deleteVideoResume(id),
    null,
    METHODS.DELETE,
    jobSeekerCache.tags.jobSeekerById(await getCurrentUserId())
  );
  return response;
};

export const updateProfile = async (id = null, data) => {
  const userId = id || (await getCurrentUserId());
  const response = await api.mutation(
    endpoints.jobSeeker.updateJobSeeker,
    data,
    METHODS.PATCH,
    jobSeekerCache.tags.jobSeekerById(userId)
  );
  return response;
};

export const revalidateJobSeekerProfile = async (id = null) => {
  const userId = id || (await getCurrentUserId());
  jobSeekerCache.revalidate.byId(userId);
};

export const createJobSeekerProfile = async data => {
  const response = await api.mutation(
    endpoints.jobSeeker.createJobSeekerProfile,
    data,
    METHODS.POST
  );
  return response;
};

export const jobSeekerBySlug = async slug => {
  const response = await api.query(
    endpoints.jobSeeker.jobSeekerBySlug(slug),
    jobSeekerCache.tags.jobSeekerById(slug)
  );
  return response;
};

export const approvedResume = async (id, data) => {
  const result = await api.mutation(
    endpoints.jobSeeker.approveREsume(id),
    data,
    METHODS.PATCH,
    jobSeekerCache.tags.jobSeekerById(id)
  );
  return result;
};
