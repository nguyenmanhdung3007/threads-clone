import { FooterAuth } from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <FooterAuth />
    </div>
  );
}

export default AuthLayout;
