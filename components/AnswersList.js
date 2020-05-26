const AnswersList = ({question, answers}) => {
    const renderAnswers = answers.map(answer => {
        if (question.answers.includes(answers._id)) {
            return (
                <div className="exams-list-exam" key={question._id}>
                    <div className="exams-list-name">{question.questionString}</div>
                </div>
            );
        } else {
            return <div/>;
        }
    });

    return (
        <div className="exams-list">
            {renderAnswers}
        </div>
    );
};

export default AnswersList;