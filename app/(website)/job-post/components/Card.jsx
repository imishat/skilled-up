import img1 from "@/public/assets/banner-detail.jpg";
import Image from "next/image";
import SubHeader from "../../components/Subheader/Subheader";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Card({ jobPost }) {
  const { title, description, image, createdAt, slug } = jobPost;
  console.log(jobPost)

  // time convert
  let dateString = createdAt;
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Link
      href={`/job-post/job-details/${slug}`}
      className="p-2 rounded-md border border-white/70"
    >
      <div className="w-full">
        <Image
          src={image}
          alt="main card Photo"
          className="rounded-md w-full h-[210px]"
          width={315}
          height={210}
        />
      </div>
      <div className="mt-5">
        <span className="bg-btnColor text-primary px-2 py-1 rounded-full text-xs">
          New
        </span>
        <SubHeader className="text-2xl text-white">{title}</SubHeader>
        <p className="text-white/70">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <div>
              <Avatar image={image} size="small" />
            </div>
            <div>
              <h5 className="text-white font-semibold leading-2">
               {jobPost?.createdBy?. 
    firstName?jobPost?.createdBy?. 
    firstName:"ADMIN"}
              </h5>
              <span className="text-white/70 text-sm">{formattedDate}</span>
            </div>
          </div>
          <div>
            {/* <button className="">Contact Us</button> */}
            <Button>Contact Us</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
