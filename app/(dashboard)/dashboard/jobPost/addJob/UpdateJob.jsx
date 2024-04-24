"use client";
import SubHeader from "@/app/(website)/components/Subheader/Subheader";
import { endpoints } from "@/app/common";
import { Button } from "@/app/components/ui/button";
import Dropzone from "@/app/components/ui/dropzone";
import FormElements from "@/app/components/ui/form-elements";
import useToast from "@/app/components/ui/toast";
import { METHODS } from "@/app/constants";
import { fileUpload } from "@/app/lib/fileUpload";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { updateJob } from "@/app/lib/jobPost";

export default function UpdateJob({ singleData, slug }) {
  // All States
  const { Toast, showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImage] = useState(singleData?.image);
  const [file, setFile] = useState(null);

  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const updateJobDetails = async data => {
    event.preventDefault();

    setLoading(true);
    if (!data || typeof data !== "object") {
      showToast("Invalid form data", "error");
      setLoading(false);
      return;
    }

    const {
      title,
      company,
      education,
      careerLevel,
      experience,
      gender,
      salary,
      date,
      location,
      description,
    } = data;

    if (
      !title ||
      !company ||
      !file ||
      !education ||
      !careerLevel ||
      !experience ||
      !gender ||
      !salary ||
      !date ||
      !location ||
      !description
    ) {
      showToast("Please fill in all required fields", "error");
      setLoading(false);
      return;
    }

    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fileUpload(
        endpoints.fileUpload.upload,
        formData,
        METHODS.POST
      );
      if (res.data.success) {
        const newJobDetails = {
          title,
          company,
          education,
          careerLevel,
          experience,
          gender: gender.label,
          salary,
          date,
          location,
          description,
          image: res.data.data,
        };

        const result = await updateJob(slug, newJobDetails);

        if (result.success) {
          showToast("Job updated successfully", "success");
          router.push("/dashboard/jobPost");
          setLoading(false);
        } else {
          showToast("Error updating Job. Please try again", "error");
          setLoading(false);
        }
      } else {
        showToast(res.data.error, "error");
        setLoading(false);
      }
    } catch (error) {
      showToast(error.message, "error");
      setLoading(false);
    }
  };

  // Image upload function
  const handleImageUpload = async file => {
    try {
      setImage(URL.createObjectURL(file)); // Set image state with object URL
      // Add your file upload logic here
      setFile(file);
    } catch (error) {
      showToast(error.message, "Error:");
      // Handle other types of errors, such as network issues or unexpected responses
    }
  };

  return (
    <>
      <Toast />
      <div className="text-white p-5 w-full">
        <div className="bg-secondary w-full p-5 rounded-md">
          <SubHeader>Add Job</SubHeader>
          <div className="mt-10">
            <form
              className="space-y-3"
              onSubmit={handleSubmit(updateJobDetails)}
            >
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Job Name</FormElements.Label>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue={singleData?.title}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Enter Job Name"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Job Name",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Company</FormElements.Label>
                  <Controller
                    name="company"
                    control={control}
                    defaultValue={singleData?.company}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Enter Company Name"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Company Name",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>
                    Education
                  </FormElements.Label>
                  <Controller
                    name="education"
                    control={control}
                    defaultValue={singleData?.education}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Education"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Education",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>
                    Career Level
                  </FormElements.Label>
                  <Controller
                    name="careerLevel"
                    control={control}
                    defaultValue={singleData?.careerLevel}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Career Level"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Career Level",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>
                    Experience
                  </FormElements.Label>
                  <Controller
                    name="experience"
                    control={control}
                    defaultValue={singleData?.experience}
                    render={({ field }) => (
                      <FormElements.Input
                        type="number"
                        placeholder="Enter Your Experience"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Your Experience",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Gender</FormElements.Label>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={singleData?.gender}
                    render={({ field }) => (
                      <FormElements.Select
                        options={[
                          { label: "Male" },
                          { label: "Female" },
                          { label: "Both" },
                        ]}
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Your Gender",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Salary</FormElements.Label>
                  <Controller
                    name="salary"
                    control={control}
                    defaultValue={singleData?.salary}
                    render={({ field }) => (
                      <FormElements.Input
                        type="number"
                        placeholder="Enter Your Salary"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Your Salary",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>
                    Expire Date
                  </FormElements.Label>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={singleData?.date}
                    render={({ field }) => (
                      <FormElements.Input
                        type="date"
                        placeholder="Expire Date"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Expire Date",
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Location</FormElements.Label>
                  <Controller
                    name="location"
                    control={control}
                    defaultValue={singleData?.location}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Enter Your Location"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Enter Your Location",
                    }}
                  />
                </div>
              </div>
              <div>
                <FormElements.Label withAsterisk>
                  Description
                </FormElements.Label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={singleData?.description}
                  render={({ field }) => (
                    <FormElements.Input
                      type="text"
                      placeholder="Enter Description"
                      width="full"
                      {...field}
                    />
                  )}
                  rules={{
                    required: "Enter Description",
                  }}
                />
              </div>
              <div>
                {images && (
                  <div className="relative mb-20 border rounded-md p-5 border-white flex items-center justify-center">
                    <Image
                      src={images}
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] object-contain"
                      alt="Droped Image"
                    />
                    <div className="absolute top-5 right-5 bg-white rounded-md">
                      <Button variant="text" onClick={() => setImage("")}>
                        <FaRegTrashAlt />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              {!images && (
                <div>
                  <FormElements.Label withAsterisk>Icon</FormElements.Label>
                  <Dropzone
                    acceptedFileTypes={["jpg", "jpeg", "png"]}
                    subTitle="To upload, file size must be under 2MB and allowed file types are (.jpg, .png, .jpeg)"
                    onUpload={handleImageUpload}
                  />
                </div>
              )}
              <div className="flex gap-5 items-center">
                <Button type="submit" loading={loading} disabled={loading}>
                  SAVE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
