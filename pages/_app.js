import App from "next/app";

import cheating from "../api/cheating";
import '../style/main.css';

class _App extends App {
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const auth = {};

        try {
            await cheating.post('/users/checktoken', {}, {
                headers: {
                    Authorization: ctx.req.cookies.jwt
                }
            });
            auth.isSignedIn = true;
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