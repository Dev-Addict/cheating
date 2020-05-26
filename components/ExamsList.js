const ExamsList = ({exams}) => {
    const renderExams = exams.map(exam => (
        <div className="exams-list-user" key={exam._id}>
            <div className="exams-list-username">{exam.name}</div>
        </div>
    ));

    return (
        <div className="exams-list">
            {renderExams}
        </div>
    );
};

export default ExamsList;