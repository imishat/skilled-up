"use client";
import { endpoints } from "@/app/common";
import { Button } from "@/app/components/ui/button";
import Dropzone from "@/app/components/ui/dropzone";
import FormElements from "@/app/components/ui/form-elements";
import { Loader } from "@/app/components/ui/loader/Loader";
import Modal from "@/app/components/ui/modal";
import useToast from "@/app/components/ui/toast";
import { VideoPlayer } from "@/app/components/ui/video-player";
import { METHODS } from "@/app/constants";
import { fileUpload } from "@/app/lib/fileUpload";
import {
  deleteVideoResume,
  revalidateJobSeekerProfile,
} from "@/app/lib/jobSeeker";
import Image from "next/image";

import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

export default function VideoResume({ videos }) {
  // Local State
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteVideoResumeId, setDeleteVideoResumeId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  //toast state
  const { Toast, showToast } = useToast();

  console.log(videos);

  /**
   * HANDLERS
   */

  const handleUploadVideoResume = async () => {
    setUploadLoading(true);

    if (!videoFile || !thumbnail) {
      showToast("Please select video and thumbnail", "error");
      return;
    }

    if (videoFile && thumbnail) {
      try {
        const formData = new FormData();
        formData.append("video", videoFile);
        const thumbmailFormData = new FormData();
        thumbmailFormData.append("file", thumbnail);

        const thumbnailRes = await fileUpload(
          endpoints.fileUpload.upload,
          thumbmailFormData,
          "POST"
        );

        if (thumbnailRes?.data?.success) {
          const thumbnailUrl = thumbnailRes?.data?.data;
          formData.append("thumbnail", thumbnailUrl);
          const res = await fileUpload(
            endpoints.jobSeeker.uploadVideoResume,
            formData,
            METHODS.PATCH
          );
          if (res?.data?.success) {
            revalidateJobSeekerProfile();
            showToast("Video uploaded successfully", "success");
            setUploadLoading(false);
            closeUploadModalHandler();
          }
          if (!res?.data?.success) {
            showToast("Error while uploading video", "error");
            setUploadLoading(false);
          }
        }

       
      } catch (error) {
        console.error("Error while uploading video: ", error);
        showToast("Error while uploading video", "error");
        setUploadLoading(false);
      }
    }
  };

  // toggole delete modal
  const showDeleteModalHandler = id => {
    setDeleteVideoResumeId(id);
    setShowDelete(true);
  };

  // hide delete modal
  const hideDeleteModalHandler = () => {
    setShowDelete(false);
    setDeleteVideoResumeId(null);
  };

  // Delete video resume handler
  const deleteVideoResumeHandler = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteVideoResume(deleteVideoResumeId);
      if (response?.success) {
        showToast("Video resume deleted successfully", "success");
        setDeleteLoading(false);
        hideDeleteModalHandler();
      }

      if (!response?.success) {
        showToast("Error while deleting video resume", "error");
        setDeleteLoading(false);
      }
    } catch (error) {
      showToast("Error while deleting video resume", "error");
      setDeleteLoading(false);
      hideDeleteModalHandler();
    }
  };

  // upload video
  const uploadVideoHandler = file => {
    setVideoFile(file);
    setPreviewVideo(URL.createObjectURL(file));
  };

  const deSelectVideoHandler = () => {
    setVideoFile(null);
    setPreviewVideo(null);
  };

  // upload thumbnail
  const uploadThumbnailHandler = file => {
    setThumbnail(file);
  };

  const deSelectThumbnailHandler = () => {
    setThumbnail(null);
  };

  // close upload modal
  const closeUploadModalHandler = () => {
    setShowUploadModal(false);
    setVideoFile(null);
    setThumbnail(null);
  };

  return (
    <>
      <Toast />
      <div>
        <h2 className="text-1xl my-5 font-semibold">Video resume</h2>

        <div className="w-full md:flex">
          {videos?.map(video => (
            <div key={video?.file} className="relative md:w-1/2 h-72 p-3">
              <VideoPlayer
                src={video?.file}
                thumbnail={video?.thumbnail}
                className="w-full h-full border border-white/70 rounded-xl font-semibold text-xl"
              />
              <div className="absolute top-5 right-5 bg-white rounded-md">
                <Button
                  variant="text"
                  onClick={() => showDeleteModalHandler(video?._id)}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
            </div>
          ))}
          {videos && videos?.length > 3 ? (
            <div className="w-1/2 h-72 p-3 relative">
              <div className="w-full h-full">
                <label
                  htmlFor="video"
                  className="block w-full h-full border border-white/70 rounded-xl font-semibold text-xl"
                >
                  <div className="flex items-center justify-center h-full">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      id="video"
                      hidden
                      multiple
                    />
                    + Add Intro Video
                  </div>
                </label>
              </div>
              {uploadLoading && (
                <div className="absolute top-0 bg-slate-700 w-full h-full flex items-center justify-center opacity-70">
                  <Loader size={40} />
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-1/2 h-72 p-3 relative"
              onClick={() => {
                setShowUploadModal(true);
              }}
            >
              <div className="w-full h-full">
                <label
                  htmlFor="video"
                  className="block w-full h-full border border-white/70 rounded-xl font-semibold text-xl"
                >
                  <div className="flex items-center justify-center h-full">
                    + Add Intro Video
                  </div>
                </label>
              </div>
              {uploadLoading && (
                <div className="absolute top-0 bg-slate-700 w-full h-full flex items-center justify-center opacity-70">
                  <Loader size={40} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upload video resume modal */}
      <Modal
        isOpen={showUploadModal}
        toggoleModal={closeUploadModalHandler}
        title="Upload Video Resume"
        width="600px"
      >
        <div className="space-y-5">
          <h2>Upload video resume</h2>

          <div className="p-5 space-y-5">
            <div>
              <FormElements.Label>Select video</FormElements.Label>
              {videoFile ? (
                <div className="relative">
                  <VideoPlayer
                    src={previewVideo && previewVideo}
                    className="w-full h-64 border border-white/70 rounded-xl font-semibold text-xl"
                  />
                  <Button
                    onClick={deSelectVideoHandler}
                    variant="none"
                    customClass="bg-white w-10 h-10 rounded-full text-gray-500 absolute top-5 right-5 flex items-center justify-center hover:bg-gray-700 hover:text-white ring-1 ring-gray-500 ring-opacity-50"
                  >
                    x
                  </Button>
                </div>
              ) : (
                <Dropzone
                  onUpload={uploadVideoHandler}
                  acceptedFileTypes={[
                    // video file types
                    "mp4",
                    "avi",
                    "mov",
                    "wmv",
                    "flv",
                    "3gp",
                  ]}
                  subTitle="Select a video file to upload"
                  maxSize={500}
                />
              )}
            </div>
            <div>
              <FormElements.Label>Upload thumbnail</FormElements.Label>
              {thumbnail ? (
                <div className="relative">
                  <Image
                    src={
                      thumbnail
                        ? URL.createObjectURL(thumbnail)
                        : "/thumbnail.png"
                    }
                    alt="thumbnail"
                    width={500}
                    height={200}
                    className="w-full h-64 border border-white/70 rounded-xl font-semibold text-xl"
                  />
                  <Button
                    onClick={deSelectThumbnailHandler}
                    variant="none"
                    customClass="bg-white w-10 h-10 rounded-full text-gray-500 absolute top-5 right-5 flex items-center justify-center hover:bg-gray-700 hover:text-white ring-1 ring-gray-500 ring-opacity-50"
                  >
                    x
                  </Button>
                </div>
              ) : (
                <Dropzone
                  onUpload={uploadThumbnailHandler}
                  acceptedFileTypes={["png", "jpg", "jpeg"]}
                  subTitle="Select a thumbnail to upload type (png, jpg, jpeg)"
                  maxSize={5}
                />
              )}
            </div>
            <div className="flex items-center gap-4 justify-end">
              <Button variant="outline" onClick={closeUploadModalHandler}>
                Cancel
              </Button>
              <Button onClick={handleUploadVideoResume} loading={uploadLoading}>
                Upload
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Vdeo resume delete confirmation Modal */}
      <Modal
        isOpen={showDelete}
        toggoleModal={hideDeleteModalHandler}
        title="Delete Video"
        width="600px"
      >
        <div className="p-5 py-20">
          <div className="text-center flex flex-col justify-center items-center">
            <CiCircleInfo className="text-5xl text-slate-200" />
            <h2 className="text-xl text-slate-200">
              Are you want to delete this video resume?
            </h2>
            <p className="text-[13px] text-slate-400">
              Once you delete this video resume, it will be gone forever. Please
              confirm to proceed.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Button
                variant="denger"
                customclassName="bg-red-500 px-2 py-2 border border-red-500 text-white"
                loading={deleteLoading}
                onClick={deleteVideoResumeHandler}
              >
                Delete
              </Button>
              <Button variant="btnColor" onClick={hideDeleteModalHandler}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
