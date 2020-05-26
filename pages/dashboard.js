import Router from "next/router";

import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import cheating from "../api/cheating";
import Cookie from "js-cookie";

const Dashboard = ({auth, users}) => {
    if (!auth.isSignedIn && process.browser) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (auth.user.rote === 'admin') {
        return <AdminDashboard users={users}/>
    }
    return (
        <UserDashboard/>
    );
};

Dashboard.getInitialProps = async context => {
    try {
        const token = ((context.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');
        const res = await cheating.get('/users', {
            headers: {
                Authorization: token
            }
        });
        return {
            users: res.data.data.docs
        };
    } catch (err) {
        return {
            users: []
        };
    }
};

export default Dashboard;