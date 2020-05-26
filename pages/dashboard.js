import Router from "next/router";

import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import cheating from "../api/cheating";
import Cookie from "js-cookie";

const Dashboard = ({auth, users, exams}) => {
    if (!auth.isSignedIn && process.browser) {
        Router.push('/');
        return (<div/>);
    }
    if (!auth.isSignedIn) {
        return (<div/>);
    }
    if (auth.user.rote === 'admin') {
        return <AdminDashboard users={users} exams={exams}/>
    }
    return (
        <UserDashboard exams={exams}/>
    );
};

Dashboard.getInitialProps = async context => {
    const token = ((context.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');
    let users;
    let exams;
    try {
        const res = await cheating.get('/users', {
            headers: {
                Authorization: token
            }
        });
        users = res.data.data.docs;
    } catch (err) {
        users = [];
    }
    try {
        const res = await cheating.get('/exams', {
            headers: {
                Authorization: token
            }
        });
        exams = res.data.data.docs;
    } catch (err) {
        exams = [];
    }
    return {
        users,
        exams
    };
};

export default Dashboard;