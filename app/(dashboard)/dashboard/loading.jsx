import { Loader } from "@/app/components/ui/loader/Loader";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size={100} />
    </div>
  );
}
