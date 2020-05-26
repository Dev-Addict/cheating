import Link from "next/link";

const QuestionsList = ({exam, questions}) => {
    const renderQuestions = questions.map(question => {
        if (exam.questions.includes(question._id)) {
            return (
                <Link href={`/questions/${question._id}`}>
                    <div className="exams-list-exam" key={question._id}>
                        <div className="exams-list-name">{question.questionString}</div>
                    </div>
                </Link>
            );
        } else {
            return <div/>;
        }
    });

    return (
        <div className="exams-list">
            {renderQuestions}
        </div>
    );
};

export default QuestionsList;