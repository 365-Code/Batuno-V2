import type { Metadata } from "next";
import { Inter, Karla, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthState } from "@/context/AuthState";
import { ChatUserState } from "@/context/ChatState";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["500"] });
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
