import { FaAngleRight } from "react-icons/fa6";
import { jobSeekerBySlug } from "@/app/lib/jobSeeker";
import UserProfileCard from "./userProfileCard";

const Page = async ({ params }) => {
  const { slug } = params;

  const result = await jobSeekerBySlug(slug);
  const { data } = result;

  return (
    <div>
      <div className="text-white h-80 mt-20 flex flex-col items-center justify-center bg-secondary">
        <h1 className="text-4xl font-bold mb-3">Candidate Profile</h1>
        <p className="flex items-center justify-center gap-2 text-lg">
          Home <FaAngleRight /> Candidate Profile
        </p>
      </div>
      <div className="px-5 max-w-7xl mx-auto mt-28 mb-8 flex flex-col-reverse lg:flex-row gap-20">
        <div className="w-full lg:w-3/4">
          <div className="p-5 border border-white/30 rounded-2xl">
            <h1 className="text-2xl font-bold mb-5 text-white">Overview</h1>
            <p className="leading-[2em] text-base text-white">
              {data?.intro ? data?.intro : "This profile has no intro"}
            </p>
          </div>
          {data?.videoResume.map((video, index) => (
            <div className="mt-20" key={video?.id}>
              <h1 className="text-4xl font-semibold mb-8 text-white">
                Video {index + 1}
              </h1>
              <video
                src={video?.file}
                className="w-full h-96 rounded-2xl"
                controls
              />
            </div>
          ))}
          <div className="rounded-2xl mt-20 p-3 md:p-10 border border-black/30 relative">
            <h1 className="text-2xl font-semibold text-white absolute px-2 -top-4">
              Education
            </h1>
            <div className="lg:py-6 mt-5 md:mt-0 lg:pr-16">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 border border-btnColor rounded-full text-lg text-white">
                      1
                    </div>
                  </div>
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold text-white">
                    {data?.education?.title}
                  </p>
                  <p className="text-white/40">{data?.education?.year}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl mt-20 p-5 md:p-10 border border-black/30 relative">
            <h1 className="text-2xl font-semibold text-white absolute px-2 -top-4">
              Work Experience
            </h1>
            <div>
              {data?.skills?.map((skill, index) => (
                <div className="flex mt-5 md:mt-0" key={skill.id}>
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 text-white border border-btnColor rounded-full text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="w-px h-full bg-btnColor" />
                  </div>
                  <div className="pt-1 pb-8">
                    <p className="mb-2 text-lg font-bold text-white">
                      {skill?.name} {`(${skill?.yearsOfExperience}+ years)`}
                    </p>
                    <p className="text-white/40">{skill?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <UserProfileCard data={data} />
      </div>
    </div>
  );
};

export default Page;
