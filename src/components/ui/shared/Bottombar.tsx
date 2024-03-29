import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.route}
            className={` ${
              isActive && "bg-dark-3 rounded-[6px]"
            } flex-center flex-col gap-1 px-4 transition py-1.5`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={24}
              height={24}
              className={`${isActive && "invert-white"} `}
            />
            <p className="tiny-medium">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
