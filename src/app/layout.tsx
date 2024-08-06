import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthState } from "@/context/AuthState";
import { ChatUserState } from "@/context/ChatState";

const karla = Karla({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Batuno",
  description:
    "Batuno, the chat app, revolutionizes the way we interact and connect with others.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthState>
      <ChatUserState>
        <html lang="en">
          <body id="body" className={karla.className}>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
          </body>
        </html>
      </ChatUserState>
    </AuthState>
  );
}
