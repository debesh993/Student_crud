import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import LoadingRing from "./LoadingRing"; 

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, updateStudent, fetchStudents } = useContext(StudentContext);

  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selected = students.find((s) => s._id === id || s.id === id);
    if (selected) {
      setStudent({
        name: selected.name || "",
        age: selected.age || "",
        email: selected.email || "",
      });
    } else {
      toast.error("Student not found!");
      navigate("/"); 
    }
  }, [id, students, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateStudent(id, student);

      setTimeout(() => {
        toast.success("Student updated successfully!");
        fetchStudents();
        navigate("/"); 
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition text-gray-700 text-2xl flex items-center justify-center z-50"
        aria-label="Go back"
      >
        <HiArrowLeft />
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Edit Student</h1>

      {loading ? (
        <LoadingRing duration={3000} size={60} color="green" />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email (cannot change)</label>
            <input
              type="email"
              name="email"
              value={student.email}
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Update Student
          </button>
        </form>
      )}
    </div>
  );
};

export default EditStudent;