import Cookie from "js-cookie";
import Router from "next/router";

import cheating from "../../../api/cheating";

const Question = ({question, auth, answers}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (process.browser && !question) {
        Router.push('/dashboard');
        return (<div/>);
    }
    if (!question) {
        return (<div/>);
    }

    return (
        <div className="exam">
            <h1>{question.questionString}</h1>
        </div>
    );
};

Question.getInitialProps = async context => {
    const token = ((context.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');
    let question;
    let answers;
    try {
        const res = await cheating.get(`/questions/${context.query.id}`, {
            headers: {
                Authorization: token
            }
        });
        question = res.data.data.doc;
    } catch (err) {
        question = undefined;
    }
    try {
        const res = await cheating.get(`/answers`, {
            headers: {
                Authorization: token
            }
        });
        answers = res.data.data.docs;
    } catch (err) {
        answers = [];
    }
    return {
        question,
        answers
    };
};

export default Question;