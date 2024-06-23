import { useLocation } from 'react-router-dom';


const SideBarItem = ({href, children}) => {
    const location = useLocation();

    const isActive = location.pathname === href;
    return (
        <li><a className={isActive ? 'is-active': ''} href={href}>{children}</a></li>
    )
}

const AdminSideBar = () => {
    return (
        <aside className="menu">
        <p className="menu-label">General</p>
        <ul className="menu-list">
            <SideBarItem href="/admin">Dashboard</SideBarItem>
        </ul>
        <p className="menu-label">User Management</p>
        <ul className="menu-list">
            <SideBarItem href="/admin/users">Users</SideBarItem>
            <SideBarItem href="/admin/users/create">Add Users</SideBarItem>
            <SideBarItem href="/admin/users/settings">User Settings</SideBarItem>
        </ul>
        <p className="menu-label">Configuration</p>
        <ul className="menu-list">
            <SideBarItem href="/admin/config/database">Database</SideBarItem>
        </ul>
        </aside>
    )
}

export default AdminSideBar;