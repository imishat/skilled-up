import WhatsApp from "@/app/components/ui/whatsApp";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Page = () => {
  return (
    <div className="px-3 my-12 container">
      <h2 className="categoryTitle text-white text-center text-3xl font-bold">
        If You Want to Hire Someone Contact Us
      </h2>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center mt-6 gap-5 md:gap-14">
        <WhatsApp
          phoneNumber={process.env.WHATSAPP_NUMBER}
          message={"Hello There"}
          className="w-full"
        >
          <div className="w-full h-24 bg-btnColor text-primary flex items-center justify-center rounded">
            <FaWhatsapp className="text-4xl mx-auto text-green-600" />
          </div>
        </WhatsApp>
        <a
          href="https://www.facebook.com/skilledup.net"
          target="_blank"
          className="w-full"
        >
          <div className="w-full h-24 bg-btnColor text-primary flex items-center justify-center rounded">
            <FaFacebookF className="text-4xl mx-auto text-blue-500" />
          </div>
        </a>
        <a href="" className="w-full">
          <div className="w-full h-24 bg-btnColor text-primary flex items-center justify-center rounded">
            <FaLinkedinIn className="text-4xl mx-auto text-blue-500" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Page;
