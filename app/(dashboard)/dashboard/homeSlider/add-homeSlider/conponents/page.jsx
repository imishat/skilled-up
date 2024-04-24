"use client";

import { Button } from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import useToast from "@/app/components/ui/toast";
import { deleteBanner } from "@/app/lib/banner";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

export default function SubTable({ bannerData }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

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
  const deleteBannerHandler = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteBanner(deleteBannerId);

      if (response?.success) {
        showToast("Banner deleted successfully", "success");
        setDeleteLoading(false);
        hideDeleteModalHandler();
      }

      if (!response?.success) {
        showToast("Error while deleting  Banner", "error");
        setDeleteLoading(false);
      }
    } catch (error) {
      showToast("Error while deleting Banner", "error");
      setDeleteLoading(false);
      hideDeleteModalHandler();
    }
  };

  return (
    <>
      <Toast />
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          {/* Table Headers */}
          <thead className="border-b font-medium text-white">
            <tr>
              <th scope="col" className="px-6 py-4">
                No.
              </th>
              <th scope="col" className="px-6 py-4">
                Icon
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="text-white/70">
            {bannerData?.map((banner, index) => (
              <tr className="border-b" key={index}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {banner?.image ? (
                    <Image
                      src={banner?.image}
                      width={42}
                      height={42}
                      alt="Icon"
                    />
                  ) : (
                    setDeleteLoading(true)
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                  <Link href={`homeSlider/edite-banner/${banner?.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => showDeleteModalHandler(banner?.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Modal */}
      <Modal
        isOpen={showDelete}
        toggleModal={hideDeleteModalHandler}
        title="Delete Banner"
        width="600px"
      >
        <div className="p-5 py-20">
          <div className="text-center flex flex-col justify-center items-center">
            <CiCircleInfo className="text-5xl text-slate-200" />
            <h2 className="text-xl text-slate-200">
              Are you sure you want to delete this banner?
            </h2>
            <p className="text-[13px] text-slate-400">
              Once you delete this banner, it will be gone forever. Please
              confirm to proceed.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Button
                variant="danger"
                onClick={() => {
                  // Handle delete action
                  deleteBannerHandler(deleteBannerId);
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
