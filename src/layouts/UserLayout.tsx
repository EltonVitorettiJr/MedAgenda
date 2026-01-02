import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="grow py-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
