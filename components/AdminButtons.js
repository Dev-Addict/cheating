import Link from "next/link";

const AdminButtons = (props) => {
    return (
        <div className="admin-buttons">
            <Link href="/createuser">
                <button className="admin-buttons-button">Create User</button>
            </Link>
            <Link href="/createexam">
                <button className="admin-buttons-button">Create Exam</button>
            </Link>
        </div>
    );
};

export default AdminButtons;