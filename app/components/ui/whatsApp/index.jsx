"use client";
/**
 * @param phoneNumber - This param contains a string value representing the phone number
 * @param message - This param contains a string value representing the message
 * @param children - This param contains a string value representing text inside the button
 * @example
 * <WhatsApp phoneNumber={'0123456789'} message={"Here goes the message"} />
 */

export default function WhatsApp({ phoneNumber, message, children }) {
  const URL = "https://wa.me";

  phoneNumber = phoneNumber?.replace(/[^\w\s]/gi, "").replace(/ /g, "");

  let url = `${URL}/${phoneNumber}`;

  if (message) {
    url += `?text=${encodeURI(message)}`;
  }

  return (
    <div
      onClick={e => {
        window.open(url);
      }}
      className="w-full cursor-pointer flex items-center gap-2"
    >
      {children}
    </div>
  );
}
