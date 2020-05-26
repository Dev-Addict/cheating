import Link from "next/link";

const QuestionButtons = ({id}) => {
    return (
        <div className="admin-buttons">
            <Link href={`/questions/${id}/createanswer`}>
                <button className="admin-buttons-button">Create Answer</button>
            </Link>
        </div>
    );
};

export default QuestionButtons;