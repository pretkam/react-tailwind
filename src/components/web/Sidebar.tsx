import { Link, useLocation } from "react-router-dom";

interface Menu {
  id: string | number;
  text: string;
  path: string;
}

const menus: Menu[] = [
  { id: 1, text: "Home", path: "/" },
  { id: 2, text: "Product", path: "/product" },
  { id: 3, text: "Hmmmm", path: "/hmmm" },
];

export default function Sidebar({ logout, mdMenu = false }: any) {
  const { pathname } = useLocation();

  const MenuItem = ({ menu }: { menu: Menu }) => (
    <Link to={menu.path} className="w-full">
      <button
        className={
          (pathname === menu.path ? "bg-indigo-300" : "") +
          " mb-2 p-2 border border-indigo-300 w-full text-left"
        }
      >
        <span
          className={
            (pathname === menu.path ? "text-white" : "") +
            " font-semibold text-xl"
          }
        >
          {menu.text}
        </span>
      </button>
    </Link>
  );

  return (
    <div
      className={
        (!mdMenu ? "hidden" : "") +
        " lg:block fixed left-0 top-0 p-5 border-r-2 h-screen bg-white max-w-[310px]"
      }
    >
      <h2 className="font-bold text-2xl text-center tracking-widest break-all">
        React Tailwind
      </h2>
      <div className="flex flex-col items-start w-full h-full py-5 justify-between">
        <div className="">
          {menus.map((menu: Menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </div>
        <button
          onClick={logout}
          className="mb-2 p-2 border border-indigo-200 text-left"
        >
          <span className="font-semibold text-xl">Logout</span>
        </button>
      </div>
    </div>
  );
}
