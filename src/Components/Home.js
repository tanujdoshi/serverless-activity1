import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://nctmtjg2gg4lit42ncpvgk7v2i0mnmri.lambda-url.us-east-1.on.aws/"
      );
      const data = response.data;
      console.log("HEREE", data);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete and refetch users after successful deletion
  const handleDelete = async (userId) => {
    try {
      const res = await axios.post(
        `https://l30hng5wwc.execute-api.us-east-1.amazonaws.com/Prod`,
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User deleted", res.data);

      // Fetch updated list of users after delete
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleView = (user) => {
    console.log(user);
    navigate("/user-profile", { state: { user } });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => navigate("/create")}>
          Add New User
        </Button>
      </div>

      <UserTable users={users} onDelete={handleDelete} onView={handleView} />
    </div>
  );
};

export default Home;
