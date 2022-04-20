import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import UserShow from "./UserShow";
import '../styles/UserContainer.css'

export default function UserContainer() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  // READ

  useEffect(() => {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then(setUsers)
  }, []);
  
  // function onHireUser(newUser) {
  //   setUsers((users) => [...users, newUser])
  // }

  return (
      <div>

        {/* <h2 className="home-page-header">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.user_name} -&gt; &nbsp;
              </span>
              <Link to={`/users/${user.id}`}>Details</Link>
            </li>
          ))}
        </ul> */}

        {/* <zzUserHire onHireUser={onHireUser} /> */}

        {/* <h2>Select User</h2> */}
        <h5> </h5>
        
        <div>
          <label htmlFor="user_id">User</label>
          <select
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.user_name}
              </option>
            ))}
          </select>
        </div>

        {userId && (
          <UserShow id={userId}/>
        )}

      </div>
  );
}
