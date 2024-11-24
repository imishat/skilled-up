import { Avatar } from "@/app/components/ui/avatar";
import plumber from "@/public/assets/plumber.jpg";
import Image from "next/image";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Loader from "./Loader";

export default function SearchResult({
  jobSeekers,
  metaData,
  setPage,
  loading,
}) {
  const { totalResults, currentItems, totalPages, page } = metaData || {};
  console.log(jobSeekers);

  const renderJobSeekers = () => {
    if (jobSeekers.length === 0) {
      return (
        <div className="w-full h-96 flex items-center justify-center">
          <h1 className="text-2xl text-white/80">No job seekers found</h1>
        </div>
      );
    }

    return jobSeekers?.map((jobSeeker, key) => {
      return (
        <Link
          key={key}
          href={`/discription/${jobSeeker?.slug}`}
          className="h-full text-white"
        >
          <div>
            {jobSeeker?.videoResume.map(
              (video, index) =>
                index === 0 && (
                  <Image
                    className="w-full object-cover h-full rounded-lg"
                    src={video?.thumbnail || thumbnail}
                    alt=""
                    width={350}
                    height={350}
                    key={index}
                  />
                )
            )}
          </div>
          <div className="flex gap-3 items-center mt-3">
            <div>
              <Avatar
                size="medium"
                image={
                  jobSeeker?.user?.profilePicture
                    ? jobSeeker?.user?.profilePicture
                    : null
                }
                name={`${jobSeeker?.user?.firstName} ${jobSeeker?.user?.lastName}`}
                rounded={true}
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wider">
                {jobSeeker?.user?.firstName} {jobSeeker?.user?.lastName}
              </h2>
              <p className="text-xs text-white/80 text-ellipsis">
                {jobSeeker?.intro?.length >= 25
                  ? jobSeeker?.intro.slice(0, 25) + "..."
                  : jobSeeker?.intro}
              </p>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="w-full px-5">
      <div className="flex flex-wrap gap-5 justify-between items-center border-b border-b-white/75 mb-5">
        <p>
          Showing{" "}
          <span className="text-white/80 font-bold">{currentItems}</span> of{" "}
          <span className="text-white/80 font-bold">{totalResults}</span> jobs
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {renderJobSeekers()}
        </div>
      )}

      <div className="my-10">
        <ol className="flex items-center gap-3">
          {page > 1 && (
            <li
              onClick={() => setPage(parseInt(page) - 1)}
              className="text-2xl bg-btnColor/80 p-5 rounded-full w-16 h-16 text-black flex items-center justify-center hover:bg-btnColor cursor-pointer"
            >
              <GoChevronLeft />
            </li>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              onClick={() => setPage(parseInt(i) + 1)}
              className={`
                text-2xl p-5 rounded-full cursor-pointer text-black w-8 h-8 flex items-center justify-center
                ${
                  parseInt(page) === i + 1
                    ? "bg-yellow-600 text-white cursor-not-allowed"
                    : "bg-btnColor/70"
                }
              `}
            >
              {i + 1}
            </li>
          ))}

          {parseInt(page) < totalPages && (
            <li
              onClick={() => setPage(parseInt(page) + 1)}
              className="text-2xl bg-btnColor/80 p-5 rounded-full text-black w-16 h-16 flex items-center justify-center hover:bg-btnColor cursor-pointer"
            >
              <GoChevronRight />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}
