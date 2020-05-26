import {Formik, Form, Field} from 'formik';
import BasePage from "../components/BasePage";
import Input from "../components/Input";
import Router from "next/router";
import {useState} from "react";
import cheating from "../api/cheating";

const INITIAL_VALUES = {
    username: '',
    password: ''
};

const CreateUser = ({auth}) => {
    if (process.browser && !auth.isSignedIn) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (process.browser && auth.isSignedIn && auth.user.rote === 'user') {
        Router.push('/dashboard');
        return (<div/>);
    }
    if (auth.isSignedIn && auth.user.rote === 'user') {
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
        cheating.post('/users', values)
            .then(res => {
                Router.push('/dashboard');
            })
            .catch(err => {
                setError(err.response.data.message);
                setSubmitting(false);
            });
    };
    return (
        <BasePage title="Create User">
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
                            <Field type="text" name="username" component={Input} label="Username"/>
                            <Field type="password" name="password" component={Input} label="Password"/>
                            <div className="error">{error}</div>
                            <button type="submit" disabled={isSubmitting}>
                                Create User
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </BasePage>
    );
};

export default CreateUser;