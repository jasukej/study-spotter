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
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { ColorSchemeScript } from '@mantine/core';
import AddReviewModal from "./components/modals/AddReviewModal";
import SearchModal from "./components/modals/SearchModal";
import UpdateInstitutionModal from "./components/modals/UpdateInstitutionModal";
import { Suspense } from "react";
import Head from "next/head";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Study Spotter",
  description: "Find your ideal study spot!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  const theme = createTheme({
   // No theme yet
  });

  return (
    <html lang="en">
    <Head>
      <ColorSchemeScript />
      <title>{metadata.title}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" /> 
    </Head>
      <body className={font.className}>
        <MantineProvider theme={theme}>
          <RegisterModal />
          <Suspense> 
            <SearchModal />
          </Suspense>
          <LoginModal />
          <AddSpotModal />
          <AddReviewModal />
          {/* <UpdateInstitutionModal /> */}
          <Navbar currentUser={currentUser} />
          <div className="bg-white pb-20 pt-24">
            {children}
          </div>
          <Toaster />
          <Footer />
        </MantineProvider>
      </body>
    </html>
    
  );
}
