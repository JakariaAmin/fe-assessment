import React from "react";
import type {Metadata} from "next";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {Inter} from "next/font/google";
import {Providers} from "@/stores/provider";
import "../styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title      : "FE Assessment",
  description: "React.js front end assessment for Maybank",
};

const RootLayout = ({children}: React.PropsWithChildren) => (
  <Providers>
    <html lang = "en">
      <body className = {inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  </Providers>
);

export default RootLayout;
