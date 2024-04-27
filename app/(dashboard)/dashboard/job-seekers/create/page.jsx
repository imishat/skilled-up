"use client";

import { endpoints } from "@/app/common";
import { Button } from "@/app/components/ui/button";
import Dropzone from "@/app/components/ui/dropzone";
import FormElements from "@/app/components/ui/form-elements";
import useToast from "@/app/components/ui/toast";
import { METHODS } from "@/app/constants";
import { fileUpload } from "@/app/lib/fileUpload";
import { getAllCategories } from "@/app/lib/jobCategories";
import { createJobSeekerProfile } from "@/app/lib/jobSeeker";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

export default function CreateJobSeeker() {
  // Local state
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    intro: "",
    education: {
      title: "",
      year: 2000,
    },
    skills: [
      {
        category: { value: "", label: "" },
        yearsOfExperience: null,
      },
    ],
    videoResume: [],
    resume: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [videoResumeFiles, setVideoResumeFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [categoryOptions, setCategoyOptions] = useState([
    { value: "", label: "" },
  ]);

  // Form State
  const [skills, setSkills] = useState([
    {
      category: { value: "", label: "" },
      yearsOfExperience: null,
    },
  ]);

  // hooks
  const { Toast, showToast } = useToast();
  const router = useRouter();

  /**
   * HANDLERS
   */
  const fetchCategories = async () => {
    const res = await getAllCategories();
    if (res) {
      const options = res.map(cat => ({ value: cat.id, label: cat.name }));
      setCategoyOptions(options);
    }
  };
  // add new skill
  const addSkill = () => {
    const newSkill = {
      category: { value: "", label: "" },
      yearsOfExperience: null,
    };
    setPayload({ ...payload, skills: [...payload.skills, newSkill] });
  };

  // remove skills
  const removeSkill = index => {
    setPayload({
      ...payload,
      skills: payload.skills.filter((_, i) => i !== index),
    });
  };

  const handleResumeUpload = file => {
    setResumeFile(file);
  };

  const handleVideoResumeUpload = file => {
    setVideoResumeFiles([...videoResumeFiles, file]);
  };

  const handleAddJobSeeker = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let resumeLink = payload.resume;
      let videoResumeLinks = payload.videoResume.map(video => video.file);

      // upload resume to the server if not already uploaded
      if (resumeFile && !resumeLink) {
        const resumeFormData = new FormData();
        resumeFormData.append("file", resumeFile);

        const resumeResponse = await fileUpload(
          endpoints.fileUpload.upload,
          resumeFormData,
          METHODS.POST
        );

        if (resumeResponse?.data?.data) {
          resumeLink = resumeResponse.data.data;
        } else {
          setError("Failed to upload resume");
          setLoading(false); // Reset loading state
          return;
        }
      }

      // upload video resumes to the server
      if (videoResumeFiles.length > 0) {
        const videoUploadPromises = videoResumeFiles.map(async file => {
          const videoResponse = await uploadVideoResume(file);
          if (videoResponse) {
            videoResumeLinks.push(videoResponse);
          }
        });
        await Promise.all(videoUploadPromises);
      }

      // update payload with links
      const updatedPayload = {
        ...payload,
        resume: resumeLink,
        videoResume: videoResumeLinks.map(file => ({ file })),
      };

      const skills = updatedPayload.skills.map(skill => ({
        jobCategory: skill.category.value,
        yearsOfExperience: skill.yearsOfExperience,
      }));

      updatedPayload.skills = skills;

      // add job seeker
      const createJobSeekerRes = await createJobSeekerProfile(updatedPayload);

      if (createJobSeekerRes?.success) {
        setLoading(false);
        showToast("Job Seeker Created", "success");
        router.push("/dashboard/task-list");
      }

      if (!createJobSeekerRes?.success) {
        showToast(createJobSeekerRes?.message, "success");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Failed to create job seeker");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // upload video resume to the server
  const uploadVideoResume = async file => {
    const formData = new FormData();

    formData.append("file", file);
    const response = await fileUpload(
      endpoints.fileUpload.upload,
      formData,
      METHODS.POST
    );

    if (response?.data?.success) {
      setPayload({
        ...payload,
        videoResume: [...payload.videoResume, { file: response.data.data }],
      });
      return response.data.data;
    }
  };

  /**
   * EFFECTS
   */
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Toast />
      <div className="text-white container py-10">
        <div className="bg-[#1f2023] px-8 py-12 rounded-sm">
          <h1 className="text-2xl text-slate-100">Create Job Seeker</h1>

          <div className="pt-6">
            <form className="space-y-5" onSubmit={handleAddJobSeeker}>
              <div className="flex items-center gap-6">
                <div className="w-full">
                  <FormElements.Label>First Name</FormElements.Label>
                  <FormElements.Input
                    type="text"
                    value={payload.firstName}
                    onChange={e =>
                      setPayload({ ...payload, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <FormElements.Label>First Name</FormElements.Label>
                  <FormElements.Input
                    type="text"
                    value={payload.lastName}
                    onChange={e =>
                      setPayload({ ...payload, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-full">
                <FormElements.Label>Phone number</FormElements.Label>
                <FormElements.Input
                  type="text"
                  value={payload.phoneNumber}
                  onChange={e =>
                    setPayload({ ...payload, phoneNumber: e.target.value })
                  }
                />
              </div>

              <div className="w-full">
                <FormElements.Label>Intro</FormElements.Label>
                <FormElements.Input
                  type="text"
                  value={payload.intro}
                  onChange={e =>
                    setPayload({ ...payload, intro: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="w-full">
                  <FormElements.Label>Degree Name</FormElements.Label>
                  <FormElements.Input
                    type="text"
                    value={payload.education.title}
                    onChange={e =>
                      setPayload({
                        ...payload,
                        education: {
                          ...payload.education,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="w-full">
                  <FormElements.Label>Passing year</FormElements.Label>
                  <FormElements.Input
                    type="text"
                    value={payload.education.year}
                    onChange={e =>
                      setPayload({
                        ...payload,
                        education: {
                          ...payload.education,
                          year: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="">
                <div className="flex items-center justify-between">
                  <FormElements.Label>Your skills</FormElements.Label>
                  <Button variant="text" onClick={addSkill}>
                    Add Skill
                  </Button>
                </div>

                {payload?.skills?.length > 0 &&
                  payload?.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="space-y-3 bg-secondary py-6 px-6 rounded"
                    >
                      <div className="space-y-2">
                        <FormElements.Label>Select Skills</FormElements.Label>
                        <FormElements.SelectV2
                          options={categoryOptions}
                          value={skill?.category?.value}
                          onChange={e => {
                            const newSkills = [...payload.skills];
                            newSkills[index].category = {
                              value: e.target.value,
                              label:
                                e.target.options[e.target.selectedIndex].text,
                            };
                            setPayload({
                              ...payload,
                              skills: newSkills,
                            });
                          }}
                          defaultValue={payload.skills[index]?.category}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormElements.Label>
                          How much experience you have?
                        </FormElements.Label>
                        <FormElements.Input
                          value={skill?.yearsOfExperience}
                          onChange={e => {
                            const newSkills = [...payload.skills];
                            newSkills[index].yearsOfExperience = parseInt(
                              e.target.value
                            );
                            setPayload({
                              ...payload,
                              skills: newSkills,
                            });
                          }}
                          type="number"
                        />
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            removeSkill(index);
                          }}
                          type="button"
                          variant="none"
                          customclassName="text-red-500"
                          disabled={skills.length === 1 ? true : false}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <FormElements.Label>Resume</FormElements.Label>
                <Dropzone
                  onUpload={handleResumeUpload}
                  title="Upload your resume file."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {videoResumeFiles.map((video, index) => (
                  <div key={index} className="w-full relative">
                    <video
                      controls
                      className="w-full h-56 border border-white/70 rounded-xl font-semibold text-xl"
                    >
                      <source
                        src={
                          video?.file ? URL.createObjectURL(video?.file) : null
                        }
                        type="video/mp4"
                      />
                    </video>
                    <button
                      className="bg-white text-gray-800 w-8 h-8 flex items-center justify-center rounded-full absolute top-2 right-2"
                      onClick={() => {
                        setVideoResumeFiles(
                          videoResumeFiles.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <FormElements.Label>Video Resume</FormElements.Label>
                <Dropzone
                  onUpload={handleVideoResumeUpload}
                  title="Upload your video resume file."
                  maxSize={500}
                  acceptedFileTypes={["mp4", "avi"]}
                  subTitle="Only mp4 and avi files are allowed"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="btnColor"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Aadd Job Seeker
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
