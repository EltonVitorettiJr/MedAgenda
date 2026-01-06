import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import Logo from "../assets/Logo-sem-fundo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { authState, logOutSupabase } = useAuth();

  const { pathname } = useLocation();

  return (
    <header className="w-full flex items-center justify-around border border-gray-400 bg-gray-200">
      <div>
        <Link to="/agenda" className="flex items-center justify-center">
          <img src={Logo} alt="Logo MedAgenda" className="w-20" />
          <h1 className="text-primary-500 font-bold text-2xl">MedAgenda</h1>
        </Link>
      </div>
      <nav className="flex gap-3 items-center justify-center text-xl font-medium text-gray-600">
        <Link
          to="/agenda"
          className={`
          ${pathname === "/agenda" ? "border-b-3 border-primary-500 text-primary-500" : ""}
          `}
        >
          Agenda
        </Link>
        <p className="font-normal">|</p>
        <Link
          to="/pacientes"
          className={`
          ${pathname === "/pacientes" ? "border-b-3 border-primary-500 text-primary-500" : ""}
          `}
        >
          Pacientes
        </Link>
      </nav>
      <div className="flex gap-4 text-gray-600 items-center justify-center">
        <p>
          Logado com: <br />
          <span className="text-gray-700 font-medium">
            {authState.user.email}
          </span>
        </p>
        <p className="text-xl">|</p>
        <button
          type="button"
          className="flex justify-center items-center gap-2 hover:text-red-400 cursor-pointer"
          onClick={logOutSupabase}
        >
          <LogOut />
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
