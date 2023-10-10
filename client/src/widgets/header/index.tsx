import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-300 shadow-lg px-2 sm:px-0">
      <div className="container mx-auto flex gap-4 justify-between items-center py-4 mb-6">
        <Link to="/" className="prose sm:prose-2xl font-bold">
          <span className="text-slate-500">Perm</span>
          <span className="text-slate-700">Estate</span>
        </Link>

        <form className="bg-slate-200 rounded-lg flex items-center px-2">
          <input type="text" placeholder="Поиск…" className="w-32 sm:w-auto p-1 bg-transparent" />
          <MagnifyingGlassIcon className="w-6 text-slate-400" />
        </form>

        <ul className="flex gap-4">
          <li className="hidden sm:inline">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline">
            <Link to="/about/">About</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
