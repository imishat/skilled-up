import SubHeader from "@/app/(website)/components/Subheader/Subheader";

export default function Information({ singleJob }) {
  return (
    <div className="bg-secondary p-5 w-full lg:w-2/6 rounded-lg">
      <SubHeader className="text-white">Information</SubHeader>
      <ul className="space-y-4">
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Date Posted</p>
          <p>June 20, 2023</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Location</p>
          <p>{singleJob?.location}</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Category</p>
          <p>{singleJob?.title}</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Offered Salary:</p>
          <p>{singleJob?.salary}/ month</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Expiration date</p>
          <p>June 5, 2031</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Experience</p>
          <p>3 Year</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Gender</p>
          <p>Both</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Industry</p>
          <p>{singleJob?.company}</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Qualification</p>
          <p>Master’s Degree</p>
        </li>
        <li className="flex items-center justify-between text-white/70 border-b border-b-white/40">
          <p>Career Level</p>
          <p>Officer</p>
        </li>
      </ul>
    </div>
  );
}
