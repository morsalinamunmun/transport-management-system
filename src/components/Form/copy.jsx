import React, { useEffect, useState } from "react";
import axios from "axios";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.dropshep.com/api/driver")
      .then((response) => {
        if (response.data.status === "success") {
          setDrivers(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading drivers...</p>;

  return (
    <div>
      <h2>Driver List</h2>
      {drivers.map((driver) => (
        <div
          key={driver.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>Name:</strong> {driver.name}
          </p>
          <p>
            <strong>Contact:</strong> {driver.contact}
          </p>
          <p>
            <strong>License:</strong> {driver.license}
          </p>
          <p>
            <strong>Status:</strong> {driver.status}
          </p>
          <p>
            <strong>Address:</strong> {driver.address}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DriverList;
