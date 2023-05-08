import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { User } from "../types";

function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
