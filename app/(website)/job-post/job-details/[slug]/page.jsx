import Image from "next/image";
import logo from "@/public/assets/e1.png";
import SubHeader from "../../../components/Subheader/Subheader";
import { CiLocationOn, CiShare2, CiHeart } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { Button } from "@/app/components/ui/button";
import { FiSend } from "react-icons/fi";
import { AiOutlineDollar } from "react-icons/ai";
import Overview from "../components/Overview";
import Information from "../components/Information";
import { getSingleJObPost } from "@/app/lib/jobPost";
// dynamic meta data
export async function generateMetadata({ params }) {
  const { slug } = params;
  //get deta
  const singleJob = await getSingleJObPost(slug);
  return {
    title: singleJob?.title,
    description: singleJob?.description,
  };
}

export default async function JobDetails({ params }) {
  //slug
  const { slug } = params;

  //get deta

  const singleJob = await getSingleJObPost(slug);
  //convert date

  let dateString = singleJob?.date;
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div>
      <div className="h-80 bgImage"></div>
      <div className="lg:max-w-7xl w-full mx-auto">
        <div className="-mt-20 bg-secondary rounded-md p-5 lg:p-8 flex gap-3 flex-col lg:flex-row items-center justify-between">
          <div className="flex lg:flex-row flex-col items-center lg:justify-start justify-center gap-5">
            <div>
              <Image
                src={singleJob?.image}
                alt="logo"
                className="rounded-lg"
                width={200}
                height={100}
              />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white/50">
                {singleJob?.company}
              </p>
              <SubHeader className="my-0 text-xl text-white">
                {singleJob?.title}
              </SubHeader>
              <div className="flex items-center gap-10 text-white/60">
                <div className="flex items-center text-xs gap-1">
                  <CiLocationOn /> <span>{singleJob?.location}</span>
                </div>
                <div className="flex items-center text-xs gap-1">
                  <SlCalender />
                  <span> {formattedDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button className="bg-secondary border border-gray-800 text-white/50 px-2 py-1 rounded-full text-xs">
                  Full Time
                </button>
                <button className="bg-secondary border border-gray-800 text-white/50 px-2 py-1 rounded-full text-xs">
                  Urgent
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-3 flex flex-col items-center justify-center lg:items-end">
            <div className="flex items-center gap-3">
              <div className="text-btnColor hover:bg-btnColor hover:text-primary transition-colors duration-300 border border-white/10 p-3 rounded-full cursor-pointer">
                <CiShare2 />
              </div>
              <div className="text-btnColor hover:bg-btnColor hover:text-primary transition-colors duration-300 border border-white/10 p-3 rounded-full cursor-pointer">
                <CiHeart />
              </div>
              <Button>
                <FiSend /> Apply Now
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-light text-white/35">Deadline date:</p>
              <p className="font-semibold text-white/45 text-sm">
                June 5, 2031
              </p>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineDollar className="text-2xl text-white/35" />
              <p className="font-semibold text-white">{singleJob?.salary}</p>
              <p className="text-sm text-white/35">/ month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-start mt-10 gap-10">
          <Overview singleJob={singleJob} />
          <Information singleJob={singleJob} />
        </div>
      </div>
    </div>
  );
}
