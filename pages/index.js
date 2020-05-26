import {Formik, Form, Field} from 'formik';

import BasePage from "../components/BasePage";
import Input from "../components/Input";

const INITIAL_VALUES = {
    username: '',
    password: ''
};

const Home = ({auth}) => {
    const validate = values => {
        const errors = {};

        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                errors[key] = `${key} is required.`;
            }
        });

        return errors;
    };

    const onSubmit = (values) => {
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