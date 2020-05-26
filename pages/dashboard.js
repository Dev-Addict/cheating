import Router from "next/router";

const Dashboard = ({auth}) => {
    if (!auth.isSignedIn && process.browser) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    return (
        <div>Dashboard</div>
    );
};

export default Dashboard;