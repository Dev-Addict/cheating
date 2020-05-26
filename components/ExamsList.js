const ExamsList = ({exams}) => {
    const renderExams = exams.map(exam => (
        <div className="exams-list-exam" key={exam._id}>
            <div className="exams-list-name">{exam.name}</div>
        </div>
    ));

    return (
        <div className="exams-list">
            {renderExams}
        </div>
    );
};

export default ExamsList;