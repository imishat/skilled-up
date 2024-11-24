"use client";

import { Button } from "@/app/components/ui/button";
import FormElements from "@/app/components/ui/form-elements";
import useToast from "@/app/components/ui/toast";
import { register } from "@/app/lib/auth";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Signup({
  role,
  goOtpVerification,
  goEmailVerificationRequested,
}) {
  // LocalState
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Toast, showToast } = useToast();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  /**
   * HANDLERS
   */
  // handle login
  const signupHandler = async data => {
    setLoading(true);

    if (role === "Job Seeker") {
      goOtpVerification();
    }

    let payload;
    if (role === "Hirer") {
      payload = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
        role: "hirer",
      };
    } else if (role === "Job Seeker") {
      payload = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        password: data?.password,
        role: "user",
      };
    }

    const response = await register(payload);

    if (response?.success) {
      setLoading(false);
      setError("");

      showToast(response?.message, "success");
      reset();
      goEmailVerificationRequested();
    } else {
      setLoading(false);
      setError(response?.error);
    }
  };

  return (
    <div>
      <Toast />
      <form onSubmit={handleSubmit(signupHandler)} className="space-y-4 p-8">
        <h2 className="text-slate-200 text-xl">Signup</h2>
        {error && <FormElements.Error>{error}</FormElements.Error>}

        <div>
          <FormElements.Label withAsterisk>First name</FormElements.Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormElements.Input
                type="text"
                placeholder="First name"
                width="full"
                {...field}
              />
            )}
            rules={{
              required: "Please enter your first name",
            }}
          />
          <FormElements.Error>{errors.firstName?.message}</FormElements.Error>
        </div>

        <div>
          <FormElements.Label withAsterisk>Last name</FormElements.Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormElements.Input
                type="text"
                placeholder="Last name"
                width="full"
                {...field}
              />
            )}
            rules={{
              required: "Please enter your last name",
            }}
          />
          <FormElements.Error>{errors.lastName?.message}</FormElements.Error>
        </div>

        {role === "Hirer" && (
          <div>
            <FormElements.Label withAsterisk>Email address</FormElements.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormElements.Input
                  type="text"
                  placeholder="Enter your email"
                  width="full"
                  {...field}
                />
              )}
              rules={{
                required: "Please enter your email",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              }}
            />
            <FormElements.Error>{errors.email?.message}</FormElements.Error>
          </div>
        )}

        {role === "Job Seeker" && (
          <div>
            <FormElements.Label withAsterisk>Phone number</FormElements.Label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <FormElements.Input
                  type="text"
                  placeholder="Enter your phone number"
                  width="full"
                  {...field}
                />
              )}
              rules={{
                required: "Please enter your phone number",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{11}$/,
                  message: "Please enter a valid phone number",
                },
              }}
            />
            <FormElements.Error>
              {errors.phoneNumber?.message}
            </FormElements.Error>
          </div>
        )}

        <div>
          <FormElements.Label withAsterisk>Password</FormElements.Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormElements.Input
                type="password"
                placeholder="Enter your password(Max 8)"
                width="full"
                {...field}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              validate: {
                password: value =>
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  ) ||
                  "Password should be at least 8 characters long one uppercase letter, one lowercase letter, one number and one special character",
              },
            }}
          />
          <FormElements.Error>{errors.password?.message}</FormElements.Error>
        </div>

        <div>
          <Button
            variant="btnColor"
            size="md"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            signup
          </Button>
        </div>
      </form>
    </div>
  );
}
