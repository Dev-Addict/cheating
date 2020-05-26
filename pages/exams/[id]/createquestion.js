import {useState} from 'react';
import Cookie from "js-cookie";
import Router from "next/router";

import cheating from "../../../api/cheating";
import BasePage from "../../../components/BasePage";
import {Field, Form, Formik} from "formik";
import Input from "../../../components/Input";

const INITIAL_VALUES = {
    questionString: ''
};

const CreateQuestion = ({exam, auth}) => {
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

    const [error, setError] = useState('');

    const validate = values => {
        const errors = {};

        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                errors[key] = `${key} is required.`;
            }
        });

        return errors;
    };

    const onSubmit = (values, {setSubmitting}) => {
        setSubmitting(true);
        let question;
        cheating.post('/questions', values)
            .then(res => {
                question = res.data.data.doc;
                const newExam = {...exam};
                newExam.questions.push(question._id);
                newExam._id = undefined;
                cheating.patch(`/exams/${exam._id}`, newExam).then(res => {
                    Router.push(`/exams/${exam._id}`);
                }).catch(err => {
                    setError(err.response.data.message);
                    setSubmitting(false);
                });
            })
            .catch(err => {
                setError(err.response.data.message);
                setSubmitting(false);
            });
    };

    return (
        <BasePage title="Create Exam">
            <div className="form-container">
                <Formik
                    initialValues={INITIAL_VALUES}
                    validate={validate}
                    onSubmit={onSubmit}>
                    {({
                          isSubmitting,
                          handleSubmit
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field type="text" name="questionString" component={Input} label="Question"/>
                            <div className="error">{error}</div>
                            <button type="submit" disabled={isSubmitting}>
                                Create Question
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </BasePage>
    );
};

CreateQuestion.getInitialProps = async context => {
    const token = ((context.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');
    let exam;
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
    return {
        exam
    };
};

export default CreateQuestion;