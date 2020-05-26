import ExamsList from "./ExamsList";

const UserDashboard = ({exams}) => {
    return (
        <div>
            <h1>Exams</h1>
            <ExamsList exams={exams}/>
        </div>
    );
};
export default UserDashboard;