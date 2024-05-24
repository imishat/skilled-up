/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import SubHeader from "@/app/(website)/components/Subheader/Subheader";
import { Button } from "@/app/components/ui/button";
import Dropzone from "@/app/components/ui/dropzone";
import FormElements from "@/app/components/ui/form-elements";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/app/components/ui/toast";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { postJob } from "@/app/lib/jobPost";
import { fileUpload } from "@/app/lib/fileUpload";
import { Controller, useForm } from "react-hook-form";
import { endpoints } from "@/app/common";
import { METHODS } from "@/app/constants";

export default  function addJob() {
  const [loading, setLoading] = useState(false);
  
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  // Toast
  const { Toast, showToast } = useToast();
  const router = useRouter();

  // React Hook Form
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const upload = async data => {
    // event.preventDefault();
    setLoading(true);

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
      return;
    }

    if (!data || typeof data !== "object") {
      showToast("Invalid form data", "error");
      return;
    }


    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fileUpload(
        endpoints.fileUpload.upload,
        formData,
        METHODS.POST
      );

      if (res.data.success) {
        const jobDetails = {
          title,
          company,
          education,
          careerLevel,
          experience,
          gender: gender?.label,
          salary,
          date,
          location,
          description,
          image: res.data.data,
        };

        const result = await postJob(jobDetails);
        
        if (result.success) {
          showToast("Job added successfully", "success");
           router.push("/");
          setLoading(false);
          reset();
        }
      } else {
        showToast(res.data.error, "error");
 
        
        setLoading(false);
      }
    } catch (error) {

      setLoading(false);
    }
  };

  const handleImageUpload = async file => {
    try {
      setImage(URL.createObjectURL(file)); // Set image state with object URL
      // Add your file upload logic here
      setFile(file);
    } catch (error) {
      showToast(error.message, "Error");
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
            <form onSubmit={handleSubmit(upload)} className="space-y-3">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
                <div className="flex flex-col w-full">
                  <FormElements.Label withAsterisk>Job Name</FormElements.Label>
                  <Controller
                    name="title"
                    control={control}
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
                {image && (
                  <div className="relative mb-20 border rounded-md p-5 border-white flex items-center justify-center">
                    <Image
                      src={image}
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
              {!image && (
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
