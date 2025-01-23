import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  href: string;
  Icon: IconType;
  title: string;
  subTitle: string;
}

export const SideMenuItem = ({ href, Icon, title, subTitle }: Props) => {
  return (
    // <div className="rounded-md overflow-hidden">
      <NavLink key={href} to={href} end>
        <div className="flex items-center justify-center text-3xl rounded-md p-2">
          <Icon />
        </div>
        <div className="flex flex-col">
          <span className="text font-bold leading-5 text-white">{title}</span>
          <span className="text-sm text-white/50 hidden md:block">
            {subTitle}
          </span>
        </div>
      </NavLink>
    // </div>
  );
};
