import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyling = ({ isActive }) =>
    `text-lg text-white transition-colors hover:underline ${
      isActive ? "font-bold" : ""
    }`;
  return (
    <nav className="p-4 bg-blue-500">
      <ul className="flex justify-center space-x-8">
        <li>
          <NavLink to="/maintest" className={activeStyling}>
            Main Test / Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv" className={activeStyling}>
            TV
          </NavLink>
        </li>
        <li>
          <NavLink to="/refrigerator" className={activeStyling}>
            Refrigerator
          </NavLink>
        </li>
        <li>
          <NavLink to="/drying-cabinet" className={activeStyling}>
            Drying Cabinet
          </NavLink>
        </li>
        <li>
          <NavLink to="/sauna" className={activeStyling}>
            Sauna
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
