"use client";

import Image from "next/image";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/lib/user";
import WhatsApp from "@/app/components/ui/whatsApp";

const UserProfileCard = ({ data }) => {
  const [user, setUser] = useState(null);

  const getCurrentUserDetails = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  useEffect(() => {
    getCurrentUserDetails();
  }, []);

  // update resume sutus
  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-secondary flex flex-col items-center justify-center py-10 px-5 rounded-2xl">
        <Avatar
          name={data?.firstName + " " + data?.lastName}
          image={data?.profilePicture ? data?.profilePicture : null}
          size="large"
        />
        <h1 className="text-xl mt-3 font-semibold text-white">
          {data?.firstName + " " + data?.lastName}
        </h1>
        <p className="text-white mt-2 mb-4 text-sm">
          {user?.role === "admin" && data?.phoneNumber}
        </p>
        {user?.role === "admin" ? (
          <Button>{data?.status}</Button>
        ) : user?.role === "hirer" ? (
          <WhatsApp phoneNumber={process.env.WHATSAPP_NUMBER} message={data} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default UserProfileCard;
