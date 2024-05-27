import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import Footer from "./components/Footer";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import { Toaster } from "@/components/ui/toaster";
import getCurrentUser from "./actions/getCurrentUser";
import AddSpotModal from "./components/modals/AddSpotModal";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Study Spotter",
  description: "Find your ideal study spot!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <AddSpotModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
