'use client';

import "./globals.css";
import { IoIosArrowBack, IoMdMore } from "react-icons/io";
import { Poppins } from "next/font/google";
import { useState } from 'react';

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://10.10.0.82:5000");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <html lang="en">
      <head>
        <style jsx global>{`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`${poppins.variable} bg-white overflow-hidden`}>
        <div className="align-middle p-4 flex flex-row items-center justify-between">
          <div className="align-middle items-center flex flex-row gap-4">
            <button
              onClick={handleFetch}
              disabled={isLoading}
              className="disabled:opacity-50"
            >
              <IoIosArrowBack />
            </button>
            Few Shot Visual Prompting
          </div>
          <button>
            <IoMdMore />
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}