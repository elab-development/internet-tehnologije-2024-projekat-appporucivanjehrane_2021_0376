import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-red-600">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
