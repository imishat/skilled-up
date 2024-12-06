"use client";
import Image from "next/image";
import logo from "@/public/assets/e1.png";
import Link from "next/link";
import { approvedResume } from "@/app/lib/jobSeeker";
import { Avatar } from "@/app/components/ui/avatar";
import Modal from "@/app/components/ui/modal";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { deleteUser } from "@/app/lib/user";
import useToast from "@/app/components/ui/toast";
import { useRouter } from "next/navigation";

export default function Card({ jobSeeker }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();

  const { Toast, showToast } = useToast();

  const showDeleteModalHandler = id => {
    setDeleteBannerId(id);
    setShowDelete(true);
  };

  const hideDeleteModalHandler = () => {
    setShowDelete(false);
    setDeleteBannerId(null);
  };
  // Delete banner
  const deleteUserHandler = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteUser(deleteBannerId);

      if (response?.success) {
        showToast("User deleted successfully", "success");
        setDeleteLoading(false);
        hideDeleteModalHandler();
        window.location.reload();
      }

      if (!response?.success) {
        showToast("Error while deleting  User", "error");
        setDeleteLoading(false);
      }
    } catch (error) {
      showToast("Error while deleting User", "error");
      setDeleteLoading(false);
      hideDeleteModalHandler();
    }
  };
  //todo fif desinf and refetcj
  const ApproveApplicantProfile = async id => {
    try {
      if (id) {
        let data;
        const result = await approvedResume(id, data);
      }
    } catch (error) {}
  };

  return (
    <>
      <Toast />
      <div className="border border-white/70 p-5 rounded-md">
        <Link href={`/discription/${jobSeeker?.slug}`}>
          <div className="flex items-start gap-4">
            <div>
              <Avatar
                image={jobSeeker?.user?.profilePicture}
                name={
                  jobSeeker?.user?.firstName + " " + jobSeeker?.user?.lastName
                }
                size="medium"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {jobSeeker?.user?.firstName + " " + jobSeeker?.user?.lastName}
              </h3>
              <p className="text-sm">
                {jobSeeker?.intro?.length >= 20
                  ? jobSeeker?.intro.slice(0, 20) + "..."
                  : jobSeeker?.intro}
              </p>
            </div>
          </div>
        </Link>

        <video
          src=""
          controls
          autoPlay
          poster="../../../../../public/assets/banner-detail.jpg"
        ></video>

        <div className="space-x-2 flex justify-center">
          {jobSeeker?.status === "approved" ? (
            <>
              <Link
                href={`/discription/${jobSeeker?.slug}`}
                className="bg-btnColor text-primary inline-block px-4 py-1 rounded-md mt-2 items-center"
              >
                View Details
              </Link>
              <button
                onClick={() => showDeleteModalHandler(jobSeeker?.id)}
                className="bg-btnColor text-primary inline-block px-4 py-1 rounded-md mt-2 items-center"
              >
                Delete User
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => ApproveApplicantProfile(jobSeeker?.id)}
                className="bg-btnColor text-primary inline-block px-4 py-1 rounded-md mt-2 items-center"
              >
                Approve
              </button>
              <button
                onClick={() => showDeleteModalHandler(jobSeeker?.id)}
                className="bg-btnColor text-primary inline-block px-4 py-1 rounded-md mt-2 items-center"
              >
                Delete User
              </button>
              <Link
                href={`/discription/${jobSeeker?.slug}`}
                className="bg-btnColor text-primary inline-block px-4 py-1 rounded-md mt-2 items-center"
              >
                View Details
              </Link>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={showDelete}
        toggleModal={hideDeleteModalHandler}
        title="Delete User"
        width="600px"
      >
        <div className="p-5 py-20">
          <div className="text-center flex flex-col justify-center items-center">
            <CiCircleInfo className="text-5xl text-slate-200" />
            <h2 className="text-xl text-slate-200">
              Are you sure you want to delete this User?
            </h2>
            <p className="text-[13px] text-slate-400">
              Once you delete this User, it will be gone forever. Please confirm
              to proceed.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Button
                variant="danger"
                onClick={() => {
                  deleteUserHandler(jobSeeker?.id);
                  setShowDelete(false);
                }}
              >
                Delete
              </Button>
              <Button onClick={hideDeleteModalHandler}>Cancel</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
