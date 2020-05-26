import App from "next/app";
import Cookie from 'js-cookie';

import cheating from "../api/cheating";
import '../style/main.css';

class _App extends App {
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const auth = {};

        const token = ((ctx.req || {}).cookies || {}).jwt || Cookie.get('jwt');

        console.log(Cookie.get());

        try {
            if (!token) {
                throw new Error();
            }
            const userRes = await cheating.post('/users/checktoken', {}, {
                headers: {
                    Authorization: token
                }
            });
            auth.isSignedIn = true;
            auth.user = userRes.data.data.user;
        } catch (err) {
            auth.isSignedIn = false;
        }

        return {pageProps, auth};
    }

    render() {
        const {Component, pageProps, auth} = this.props;

        return (
            <Component {...pageProps} auth={auth}/>
        );
    }
};

export default _App;