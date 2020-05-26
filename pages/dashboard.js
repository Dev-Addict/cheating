import Router from "next/router";

import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const Dashboard = ({auth}) => {
    if (!auth.isSignedIn && process.browser) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (auth.user.rote === 'admin') {
        return <AdminDashboard/>
    }
    return (
        <UserDashboard/>
    );
};

export default Dashboard;