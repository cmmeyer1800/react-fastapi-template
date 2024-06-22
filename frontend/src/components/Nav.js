import { ThemeUpdaterButton } from "./ThemeContext";

const Nav = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item has-text-weight-bold" href="/">
                TOFILL
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">

            <a className="navbar-item" href="/#docs" onClick={(e) => e.preventDefault()}>
                Documentation [WIP]
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                More [WIP]
                </a>

                <div className="navbar-dropdown">
                <a className="navbar-item">
                    About [WIP]
                </a>
                <a className="navbar-item">
                    Contact [WIP]
                </a>
                <hr className="navbar-divider"></hr>
                <a className="navbar-item">
                    Report an issue [WIP]
                </a>
                </div>
            </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <ThemeUpdaterButton/>
                </div>
            </div>
        </div>
        </nav>
    )
}

export default Nav;