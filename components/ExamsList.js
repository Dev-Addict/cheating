import Link from "next/link";

const ExamsList = ({exams}) => {
    const renderExams = exams.map(exam => (
        <Link href={`/exams/${exam._id}`}>
            <div className="exams-list-exam" key={exam._id}>
                <div className="exams-list-name">{exam.name}</div>
            </div>
        </Link>
    ));

    return (
        <div className="exams-list">
            {renderExams}
        </div>
    );
};

export default ExamsList;