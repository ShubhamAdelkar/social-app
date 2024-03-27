import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../button";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-6">
        <Link to="/" className="flex gap-3 items-center mb-6">
          <img
            title="logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3avYnGMBCEYVfrHlzFFuEuBCrDmQNV4MCJw73kuMyY+wHJ3DOw+cew8sy+fNNERERfmpdIE7cePK4K8+JvDNy3s+vMn7+jtDrEMLAxMG3g5gn7Bj5JiFQhUqTwqcbseqAiXRTp6hIpA5xxTrnGwLSBGxoDZy14YAqRJoUTkYb07wVnVUW6uEROOGuHs+CsAibUfjRmlCkDoCwGtg4GXtF35rdvIAMrA4sNjO5P1xNuDMze2ydEGgPTBoYeqEgvinQKkSaF8zu38Gjzult4HmxeZ2Ae6xDDwIOBaQPDE/YNfJIQWYVISuFQYy49UJFORXp1ieQAZ5xT7mBg2sBAY+CsBQ9MIXJI4USkIf17wVmrIp0ukYCzLjgLzkowYe1HY0z87q8dJn5mIBHR9H/0AYoYEYixH5B1AAAAAElFTkSuQmCC"
            width={44}
          />
          <div className="flex flex-col">
            <h2 className="h2-bold">Photto</h2>
            <p className="px-[2px] tiny-medium text-light-3 mt-[-4px]">
              by Shubham
            </p>
          </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-12 w-12 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-4 border-t border-dark-4">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.route}
                className={`leftsidebar-link  group ${isActive && "bg-dark-3"}`}
              >
                <NavLink
                  to={link.route}
                  className={"flex gap-3 items-center p-3"}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    } `}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-buttom_ghost flex-start gap-3"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
