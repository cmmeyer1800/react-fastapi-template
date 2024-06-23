import { useLocation } from 'react-router-dom';

import AdminSideBar from "../components/Sidebar";

const pages = {
    "/admin": "Dashboard",
    "/admin/users": "Users",
    "/admin/users/create": "Add Users",
    "/admin/users/settings": "User Settings",
    "/admin/config/database": "Database"
}

const Admin = () => {
    const location = useLocation();

    var page;
    if (pages[location.pathname] === undefined) {
        page = (
            <h1 className='title has-text-danger has-text-centered'>Admin Page Not Valid</h1>
        )
    } else {
        page = pages[location.pathname];
    }

    return (
        <>
            <div className="columns ml-4 mr-4">
                <div className="column is-narrow box is-hidden-touch" style={{height: "100%"}}>
                    <AdminSideBar />
                </div>
                <div className="column">
                    {page}
                </div>
            </div>
        </>
    );
};

export default Admin;