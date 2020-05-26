import Head from "next/head";

const BasePage = ({children, className, auth, title}) => {
    return (
        <div className={`base-page ${className}`}>
            <Head>
                <title>Cheating - {title}</title>
            </Head>
            {children}
        </div>
    );
};

export default BasePage;