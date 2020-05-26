import Link from "next/link";

const ExamButtons = ({id}) => {
    return (
        <div className="admin-buttons">
            <Link href={`/exams/${id}/createquestion`}>
                <button className="admin-buttons-button">Create Question</button>
            </Link>
        </div>
    );
};

export default ExamButtons;