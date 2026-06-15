import { ref, push } from "firebase/database";
import { database } from "../config/firebaseConfig";

interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

export const submitContactInquiry = async ({
  name,
  email,
  phone,
  message,
  subject,
}: ContactInquiry): Promise<void> => {
  const inquiriesRef = ref(database, "inquiries");

  const newInquiry = {
    name,
    email,
    phone: phone || "",
    message,
    subject: subject || "Contact Form Inquiry",
    timestamp: Date.now(),
    formattedTime: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  await push(inquiriesRef, newInquiry);
};