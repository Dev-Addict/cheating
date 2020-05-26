import AdminButtons from "./AdminButtons";
import UsersList from "./UsersList";

const AdminDashboard = ({users}) => {
    return (
        <div>
            <AdminButtons/>
            <UsersList users={users}/>
        </div>
    );
};

export default AdminDashboard;