import { Input } from "../ui/input";
import { Search } from "lucide-react";
// import Timer from "../ui/timer";
import { AvatarDropdown } from "../ui/avatar-dropdown";
import { ModeToggle } from "../mode-toggle";

function Header() {
  return (
    <div className=" fixed dark:bg-sidebar text-white bg-[#3C4758] top-0  w-full ">
      <div className=" flex justify-between items-center px-8 py-1.5 ">
        <div className="flex gap-4 items-center w-full">
          <div className="text-2xl font-bold ">Logo</div>
          <div className="md:w-[30%] relative">
            <Search className="absolute left-2.5 top-2 " size={20} />
            <Input
              type="text"
              placeholder="Search..."
              className="  border-sidebar-border pl-10   py-4  placeholder:font-bold "
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* <Timer /> */}
          <AvatarDropdown />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
