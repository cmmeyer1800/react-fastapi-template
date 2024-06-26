import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { OAuthContext } from '../../components/context/OAuthContext';
import AdminSideBar from "../../components/Sidebar";
import AdminUsers from './AdminUsers';
import AdminDashboard from './AdminDashboard';
import AdminUserAdd from './AdminUsersAdd';

const pages = {
    "/admin": <AdminDashboard />,
    "/admin/users": <AdminUsers />,
    "/admin/users/create": <AdminUserAdd />,
    "/admin/users/settings": "User Settings",
    "/admin/config/database": "Database"
}

const Admin = () => {
    const location = useLocation();
    const { admin } = useContext(OAuthContext);

    if (!admin) {
        window.location.href = '/';
        return null;
    }

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
            <div className="columns ml-4 mr-4 is-vcentered">
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