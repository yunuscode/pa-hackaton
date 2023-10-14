import SpaceSwitcher from "./space-switcher";
import UserNav from "./user-nav";

export default function Nav() {
  return (
    <div className="border-b">
      <div className="container">
        <div className="flex h-16 items-center">
          <SpaceSwitcher />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
