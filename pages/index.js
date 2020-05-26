import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import BasePage from "../components/BasePage";
import Input from "../components/Input";
import cheating from "../api/cheating";

const INITIAL_VALUES = {
    username: '',
    password: ''
};

const Home = ({auth}) => {
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
        cheating.post('/users/signin', values)
            .then(res => {})
            .catch(err => {
                setError(err.response.data.message);
                setSubmitting(false);
            });
    };

    return (
        <BasePage title="Sign In">
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
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </BasePage>
    )
};

export default Home;