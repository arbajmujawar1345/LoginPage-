import { useEffect } from "react";

function Dashboard() {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <h1>🌾 Welcome to AgriVision Dashboard</h1>
    </div>
  );
}

export default Dashboard;