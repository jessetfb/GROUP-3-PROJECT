import Logo from "../Logo";

import NavMenu from "./NavMenu";

const DeskNavbar = () => {
  return (
    <div className="navbar">
      <Logo text="RentCars" classText="" />
      <NavMenu className="navbar-links" />
    </div>
  );
};

export default DeskNavbar;
