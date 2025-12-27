import Header from "@/components/Header";
import { NavMobileFooter, NavSideBar } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import HomePage from "@/pages/Home";
import { Plus } from "lucide-react";
import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <div className=" min-h-screen min-[700px]:bg-primary-foreground">
      <header className="sticky bg-primary-foreground top-0 h-15 grid grid-cols-1 min-[700px]:grid-cols-[76px_1fr_76px]">
        <div className="invisible hidden min-[700px]:block" />
        <div className="relative min-[700px]:max-w-160 mr-auto ml-auto w-full">
          <Header />
          <div className=" min-[700px]:flex hidden w-full ">
            <div className="absolute top-12 bg-transparent size-9 -left-3 overflow-x-hidden overflow-y-hidden">
              <div className="absolute top-3  left-3 border-primary-column-outline border-solid size-12 border-t-[0.5px] border-e-[0.5px] rounded-[24px] shadow-[0_0_12px_0_rgba(0,0,0,0.04),0_0_0_48px_rgb(250,250,250)]"></div>
            </div>
            <div className="w-[calc(100%-46px)] absolute  top-12 left-6">
              <div className="h-3 border-b-[0.5px]"></div>
            </div>
            <div className=" absolute top-12 size-9 -right-3 overflow-x-hidden overflow-y-hidden">
              <div className="absolute top-3 right-3 border-primary-column-outline border-solid size-12 border-t-[0.5px] border-e-[0.5px] rounded-[24px] shadow-[0_0_12px_0_rgba(0,0,0,0.04),0_0_0_48px_rgb(250,250,250)]"></div>
            </div>
          </div>
        </div>

        <div className="invisible hidden min-[700px]:block" />
      </header>

      <div className="grid min-h-screen grid-cols-1 min-[700px]:grid-cols-[76px_1fr_76px]">
        <div className="invisible hidden min-[700px]:block" />

        <main className="mr-auto ml-auto w-full bg-background min-[700px]:max-w-160 min-[700px]:border-[0.5px] min-[700px]:border-primary-column-outline py-5 px-6">
          {/* <HomePage /> */}

          <Outlet />
        </main>

        <div className="invisible hidden min-[700px]:block" />
      </div>

      {/* Add Post Btn */}
      <div className="fixed right-6 bottom-4 hidden min-[700px]:block">
        <Button
          variant="outline"
          className="h-17 w-20.5 cursor-pointer rounded-2xl hover:scale-110"
        >
          <Plus className="size- stroke-3" />
        </Button>
      </div>

      {/* nav sidebar */}
      <NavSideBar className="" />

      {/* nav footer */}
      <footer className="">
        <NavMobileFooter />
      </footer>
    </div>
  );
}

export default DefaultLayout;
