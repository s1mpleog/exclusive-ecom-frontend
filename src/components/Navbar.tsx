import { navLinks } from "@/constants";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { BsCart2 } from "react-icons/bs";

export default function Navbar() {
  const { user, isLoggedIn } = useAppContext();
  return (
    <nav className="container mx-auto py-5 flex items-center justify-between">
      <div>
        <Logo />
      </div>
      <div>
        {navLinks.map((link) => (
          <NavLink
            className={({ isActive }) => (isActive ? "underline mx-5" : "mx-5")}
            key={link.name}
            to={link.href}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div>
        <SearchInput />
      </div>
      {isLoggedIn && (
        <div className="flex items-center justify-center gap-3">
          <Link to="/cart">
            <BsCart2 size={25} />
          </Link>
          <p>{user?.user.firstName}</p>
          <SignOutButton />
        </div>
      )}
    </nav>
  );
}
