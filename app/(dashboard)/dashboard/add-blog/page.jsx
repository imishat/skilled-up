"use client";
import SubHeader from "@/app/(website)/components/Subheader/Subheader";
import { Button } from "@/app/components/ui/button";
import FormElements from "@/app/components/ui/form-elements";

import Dropzone from "@/app/components/ui/dropzone";
import Image from "next/image";
import { useState } from "react";
import useToast from "@/app/components/ui/toast";
import { Controller, useForm } from "react-hook-form";
import { fileUpload } from "@/app/lib/fileUpload";
import { endpoints } from "@/app/common";
import { METHODS } from "@/app/constants";
import { addJobCategory } from "@/app/lib/jobCategories";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
export default function AddCategory() {
  //loading state
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  //toast
  const { Toast, showToast } = useToast();

  const router = useRouter();

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

  // react-hook-form
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const upload = async data => {
    event.preventDefault();

    if (!data || typeof data !== "object") {
      showToast("Invalid form data", "error");
      return;
    }

    const { categoryname, description } = data;

    if (!categoryname || !description || !file) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fileUpload(
        endpoints.fileUpload.upload,
        formData,
        METHODS.POST
      );

      if (res.data.success) {
        const category = {
          name: categoryname,
          description: description,
          image: res.data.data,
        };

        const result = await addJobCategory(category);

        if (result.success) {
          showToast("Job Category added successfully", "success");
          setLoading(false);
          router.push("jobCategory");
        } else {
          showToast("Failed to add Job Category", "error");
          setLoading(false);
        }
      } else {
        showToast("Failed to upload file", "error");
        setLoading(false);
      }
    } catch (error) {
      showToast(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <div className="text-white p-5 w-full">
        <div className="bg-secondary w-full p-5 rounded-md">
          <SubHeader>Add Category</SubHeader>
          <div className="mt-10">
            <form
              onSubmit={handleSubmit(upload)}
              className="flex flex-col items-start gap-5 justify-start"
            >
              <div className="w-full">
                <div>
                  <FormElements.Label withAsterisk>
                    Category Name
                  </FormElements.Label>
                  <Controller
                    name="categoryname"
                    control={control}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Enter your category name"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Please enter category name",
                    }}
                  />
                  <FormElements.Error>
                    {errors.categoryname?.message}
                  </FormElements.Error>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <FormElements.Label withAsterisk>
                    Category Description
                  </FormElements.Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <FormElements.Input
                        type="text"
                        placeholder="Enter your category description"
                        width="full"
                        {...field}
                      />
                    )}
                    rules={{
                      required: "Please enter category description",
                    }}
                  />
                  <FormElements.Error>
                    {errors.description?.message}
                  </FormElements.Error>
                </div>
              </div>
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
              <div className="flex gap-5 items-center mt-10 justify-center">
                <Button
                  variant="btnColor"
                  size="md"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  SAVE
                </Button>
                <Button variant="danger">CANCEL</Button>{" "}
                {/* Corrected 'denger' to 'danger' */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
