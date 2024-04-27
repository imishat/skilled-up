"use client";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import plumber from "@/public/assets/plumber.jpg";
import "swiper/css";
import "swiper/css/navigation";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Avatar } from "@/app/components/ui/avatar";
import SubHeader from "../../components/Subheader/Subheader";
import { useEffect, useState } from "react";
import { getApplicant } from "@/app/lib/applicant";

export default function EditorChoice() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplicant();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {candidates?.map(candidate => (
        <div key={candidate.id} className="w-full mx-auto container my-12">
          <SubHeader className="text-white">{candidate?.name}</SubHeader>
          <div className="flex items-center group">
            <div className="text-white swiper-Prev-video-Btn opacity-0 group-hover:opacity-100 h-28 bg-white/10 rounded-lg hidden md:flex items-center justify-center">
              <GoChevronLeft className="text-5xl cursor-pointer" />
            </div>
            <div className="w-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                  prevEl: ".swiper-Prev-Btn",
                  nextEl: ".swiper-Next-Btn",
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {candidate?.items?.map(item => (
                  <SwiperSlide key={item?.applicant?.id}>
                    <Link
                      href={`/discription/${item?.applicant?.slug}`}
                      className="flex items-center h-full w-64 text-white"
                    >
                      <div className="w-64 md:w-auto">
                        <Image
                          className="w-full object-cover h-full rounded-lg"
                          src={plumber}
                          alt=""
                          width={350}
                          height={350}
                        />
                        <div className="flex gap-3 items-center mt-4">
                          <div>
                            <Avatar
                              name={
                                item?.user?.firstName + " " + item?.user?.lastName
                              }
                              image={candidate?.user?.profilePicture}
                              size="medium"
                            />
                          </div>
                          <div>
                            <h2 className="font-semibold text-lg tracking-wider">
                              {item?.user?.firstName +
                                " " +
                                item?.user?.lastName}
                            </h2>
                            <p className="text-xs text-white/80 text-ellipsis">
                              {item?.applicant?.intro.length >= 25
                                ? item?.applicant?.intro.slice(0, 25) + "..."
                                : item?.applicant?.intro}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="text-white swiper-Next-video-Btn opacity-0 group-hover:opacity-100  h-28 bg-white/10 rounded-lg hidden md:flex items-center justify-center">
              <GoChevronRight className="text-5xl cursor-pointer font-extralight" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
