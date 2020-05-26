const AnswersList = ({question, answers}) => {
    const renderAnswers = answers.map(answer => {
        if (question.answers.includes(answer._id)) {
            return (
                <div className="exams-list-exam" key={answer._id}>
                    <div className="exams-list-name">{answer.value}</div>
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