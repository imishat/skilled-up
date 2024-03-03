

import { getAllJob } from "@/app/lib/jobPost";
import Card from "./components/Card";

export default async function JobPost() {
  const allJobPost =await getAllJob()

  return (
    <div className="container">
      <div className="h-72 flex flex-col items-start justify-center ml-36">
        <h1 className="text-3xl font-semibold text-white leading-relaxed tracking-wider">
          Job Post
        </h1>
        <p className="text-white/80">Get The Leatest Job Here.</p>
      </div>
      <div className="grid grid-cols-3 gap-10 px-5">
      {
  Array.isArray(allJobPost) && allJobPost.length > 0 ? (
    allJobPost.map((jobPost) => <Card key={jobPost.id} jobPost={jobPost} />)
  ) : (
    <div>No job posts available</div>
  )
}
       
        
      </div>
    </div>
  );
}
