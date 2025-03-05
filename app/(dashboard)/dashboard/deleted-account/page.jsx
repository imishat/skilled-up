"use client";
import { Button } from "@/app/components/ui/button";
import FormElements from "@/app/components/ui/form-elements";
import useToast from "@/app/components/ui/toast";

import { deleteUser, getCurrentUser } from "@/app/lib/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useToast();

  const [user, setUser] = useState(null);

  /**
   * HANDLERS
   */
  const getCurrentUserDetails = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

    useEffect(() => {
      getCurrentUserDetails();
    }, []);



  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const handlePassword = async data => {
    event.preventDefault();
    setLoading(true);
   



    const result = await deleteUser(user?.id);

    if (!result?.success) {
      setLoading(false);
      showToast(result?.error, "error");
    }
    if (result?.success) {
      setLoading(false);
      router.push("/");
      showToast(" User Deleted successful", "success");
    }
  };

  return (
    <>
      <Toast />
      <form
        onSubmit={handleSubmit(handlePassword)}
        className="text-white max-w-xl mx-auto mt-10 space-y-5"
      >
        <div>
          <FormElements.Label>Number Or Email</FormElements.Label>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <FormElements.Input
                type="text"
                placeholder="Enter Your Number Or Email"
                width="full"
                {...field}
              />
            )}
            rules={{
              value: true,
              required: "Enter Your Number Or Email",
            }}
          />
          <FormElements.Error>{errors.oldPassword?.message}</FormElements.Error>
        </div>
       
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="btnColor"
            size="md"
            loading={loading}
            disabled={loading}
          >
          Deled Account
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
