import React, { useEffect, useState } from "react";

export const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8080/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setFormData({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to update user data");
      }

      const data = await response.json();
      setUserData(data);
      setEditing(false);
      setError("");
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setEditing(false);
    }
  };

  if (loading) {
    return <div className="m-3 alert alert-info">Loading user data...</div>;
  }

  return (
    <>
      <div
        className={`m-3 alert ${
          userData?.role === "admin" ? "alert-warning" : "alert-success"
        }`}
        style={{
          backgroundColor: userData?.role === "admin" ? "#fff3cd" : "#d1e7dd", // optional custom color
        }}
      >
        <h3>Welcome, {userData?.username}</h3>

        {error && !editing && <div className="alert alert-danger">{error}</div>}

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Username: </strong>
              {userData.username}
            </p>
            <p>
              <strong>Email: </strong>
              {userData.email}
            </p>
            <p>
              <strong>Password: </strong>********
            </p>
            <p>
              <strong>Role: </strong>
              {userData.role}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
  );
};
