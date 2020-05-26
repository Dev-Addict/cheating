import AdminButtons from "./AdminButtons";
import UsersList from "./UsersList";
import ExamsList from "./ExamsList";

const AdminDashboard = ({users, exams}) => {
    return (
        <div>
            <AdminButtons/>
            <UsersList users={users}/>
            <ExamsList exams={exams}/>
        </div>
    );
};

export default AdminDashboard;