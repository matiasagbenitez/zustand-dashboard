import type { IconType } from "react-icons";
import {
  IoSpeedometerOutline,
  IoPawOutline,
  IoLogOutOutline,
  IoHeartOutline,
  IoListOutline,
  IoAccessibilityOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { SideMenuItem } from "./SideMenuItem";
import { useAuthStore } from "../../../stores";

interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    subTitle: "Visualizar data",
    href: "/dashboard",
    Icon: IoSpeedometerOutline,
  },
  {
    title: "Osos",
    subTitle: "Manejador de osos",
    href: "/dashboard/bears",
    Icon: IoPawOutline,
  },
  {
    title: "Persona",
    subTitle: "Nombre y apellido",
    href: "/dashboard/person",
    Icon: IoAccessibilityOutline,
  },
  {
    title: "Tareas",
    subTitle: "Listado de tareas",
    href: "/dashboard/tasks",
    Icon: IoListOutline,
  },
  {
    title: "Boda",
    subTitle: "Invitados a la boda",
    href: "/dashboard/wedding-invitation",
    Icon: IoHeartOutline,
  },
];

export const SideMenu = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 "
    >
      <div id="logo" className="py-8 bg-gray-800">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-0">
          Zustand
        </h1>
      </div>

      {/*  Profile */}
      <div className="my-8">
        <a href="#">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              className="rounded-full w-10 h-10"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt="profile"
            />
            <span className="text-sm md:text-base font-bold">
              Hola, {user?.fullName}!
            </span>
          </div>
        </a>
      </div>

      {/* Menu Items */}
      <nav id="nav" className="">
        {menuItems.map((item) => (
          <SideMenuItem key={item.href} {...item} />
        ))}

        {/* Logout */}
        <NavLink
          to={"/auth/login"}
          onClick={logout}
          className="flex items-center gap-4 p-4 hover:bg-gray-800"
        >
          <div className="flex items-center justify-center text-3xl rounded-md p-2">
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-300 font-bold leading-5">Logout</span>
            <span className="text-sm text-slate-500 hidden md:block">
              Cerrar sesión
            </span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};
