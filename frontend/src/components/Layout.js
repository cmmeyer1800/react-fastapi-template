import { Outlet } from "react-router-dom";

import Nav from "./Nav.js"
import Footer from "./Footer.js";

const Layout = () => {
  return (
    <div className="hero is-fullheight">
        <Nav />
        <Outlet />
        <Footer/>
    </div>
  )
};

export default Layout;