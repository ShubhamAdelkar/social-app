import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            title="logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3avYnGMBCEYVfrHlzFFuEuBCrDmQNV4MCJw73kuMyY+wHJ3DOw+cew8sy+fNNERERfmpdIE7cePK4K8+JvDNy3s+vMn7+jtDrEMLAxMG3g5gn7Bj5JiFQhUqTwqcbseqAiXRTp6hIpA5xxTrnGwLSBGxoDZy14YAqRJoUTkYb07wVnVUW6uEROOGuHs+CsAibUfjRmlCkDoCwGtg4GXtF35rdvIAMrA4sNjO5P1xNuDMze2ydEGgPTBoYeqEgvinQKkSaF8zu38Gjzult4HmxeZ2Ae6xDDwIOBaQPDE/YNfJIQWYVISuFQYy49UJFORXp1ieQAZ5xT7mBg2sBAY+CsBQ9MIXJI4USkIf17wVmrIp0ukYCzLjgLzkowYe1HY0z87q8dJn5mIBHR9H/0AYoYEYixH5B1AAAAAElFTkSuQmCC"
            width={40}
          />
          <div className="flex flex-col">
            <h2 className="h3-bold">Photto</h2>
            <p className="px-[1px] tiny-medium text-light-3 mt-[-6px]">
              by imbachhu
            </p>
          </div>
        </Link>

        <div
          className="flex
        gap-1"
        >
          <Button
            variant="ghost"
            className="shad-buttom_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
