"use client";

import { Button } from "@/app/components/ui/button";
import { useRef } from "react";

export default function Role({
  selectedChoice,
  setSelectedChoice,
  goLogin,
  goSignup,
}) {
  // local state
  const fieldsetRef = useRef(null);

  const roles = [
    { label: "Job Seeker", id: "job_seeker" },
    { label: "Hirer", id: "hirer" },
  ];
  return (
    <div className="flex w-full max-w-xl flex-col gap-8 p-8">
      <div className="px-4">
        <label
          htmlFor="choices"
          className="mb-1.5 block text-base font-semibold leading-6 text-slate-200"
        >
          What is your role?
        </label>
        <label className="block text-sm font-normal leading-6 text-slate-400">
          Choose the role that you can use to sign up.
        </label>
        <div className="mt-4">
          <fieldset
            id="choices"
            aria-label="What is your role?"
            ref={fieldsetRef}
          >
            <legend className="sr-only">Choices</legend>
            <div className=" relative space-y-2 rounded-md">
              {roles?.map(choice => (
                <label
                  key={choice.id}
                  htmlFor={choice.id}
                  className={`relative flex cursor-pointer flex-col rounded-md border p-4 hover:bg-slate-800 focus:outline-none ${
                    selectedChoice === choice.label
                      ? "z-10 border-slate-700 bg-slate-800"
                      : "border-slate-700"
                  }`}
                >
                  <span className="flex items-center text-sm">
                    <input
                      type="radio"
                      id={choice.id}
                      value={choice.label}
                      name="role"
                      checked={choice.label === selectedChoice}
                      className="checked:text-brand-dark focus:text-brand-white h-4 w-4 border border-slate-300 focus:ring-0 focus:ring-offset-0"
                      aria-labelledby={`${choice.id}-label`}
                      onChange={e => {
                        setSelectedChoice(e.currentTarget.value);
                      }}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          // handleNextClick();
                        }
                      }}
                    />
                    <span
                      id={`${choice?.id}-label`}
                      className="ml-3 font-medium text-slate-200"
                    >
                      {choice?.label}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex justify-between">
        <button>Skip</button>
        <div className="flex items-center gap-2">
          <Button disabled={!selectedChoice} onClick={goSignup}>
            Signup
          </Button>
          <Button disabled={!selectedChoice} onClick={goLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
