const UsersList = ({users}) => {
    const renderUsers = users.map(user => (
        <div className="users-list-user" key={user._id}>
            <div className="users-list-username">{user.username}</div>
            <div className="users-list-id">{user._id}</div>
        </div>
    ));

    return (
        <div className="users-list">
            {renderUsers}
        </div>
    );
};

export default UsersList;