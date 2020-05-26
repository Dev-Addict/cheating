import Cookie from "js-cookie";
import Router from "next/router";

import ExamButtons from "../../../components/ExamButtons";
import cheating from "../../../api/cheating";
import QuestionsList from "../../../components/QuestionsList";

const Exam = ({exam, auth, questions}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (process.browser && !exam) {
        Router.push('/dashboard');
        return (<div/>);
    }
    if (!exam) {
        return (<div/>);
    }

    return (
        <div className="exam">
            <h1>{exam.name}</h1>
            <ExamButtons id={exam._id}/>
            <QuestionsList questions={questions} exam={exam}/>
        </div>
    );
};

Exam.getInitialProps = async context => {
    const token = ((context.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');
    let exam;
    let questions;
    try {
        const res = await cheating.get(`/exams/${context.query.id}`, {
            headers: {
                Authorization: token
            }
        });
        exam = res.data.data.doc;
    } catch (err) {
        exam = undefined;
    }
    try {
        const res = await cheating.get(`/questions`, {
            headers: {
                Authorization: token
            }
        });
        questions = res.data.data.docs;
    } catch (err) {
        questions = [];
    }
    return {
        exam,
        questions
    };
};

export default Exam;