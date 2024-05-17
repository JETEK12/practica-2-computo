import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  // Renderizar la lista de usuarios aquí

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

// Definir el componente App fuera de UserList y exportarlo como el componente principal del archivo
const App = () => {
  return (
    <div className="app">
      <UserList />
    </div>
  );
};

export default App;
