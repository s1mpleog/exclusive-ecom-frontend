import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col h-screen">
      <div className="border-b pb-2">
        <Navbar />
      </div>
      <main className="flex-1 w-full">{children}</main>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
