import React, { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Spinner component
const Spinner = ({ size = 60, color = "#6366f1" }) => (
  <div
    className="flex justify-center items-center"
    style={{ height: size, width: size }}
  >
    <svg
      className="animate-spin"
      style={{ height: size, width: size }}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

const Home = () => {
  const { students, deleteStudent, loading } = useContext(StudentContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      setLoadingTable(true);
      await deleteStudent(id);

      setTimeout(() => {
        toast.success("Student deleted successfully!");
        setLoadingTable(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student!");
      setLoadingTable(false);
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true, hide: "sm" },
    {
      name: "View",
      cell: (row) => (
        <button
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
          onClick={() => setSelectedStudent(row)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition"
          onClick={() => navigate(`/edit-student/${row._id}`)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Show full-page spinner when initial data is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Spinner size={100} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <button
          onClick={() => navigate("/add-student")}
          className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 transition"
        >
          + Add New Student
        </button>
      </div>

      {/* Table container */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
        {loadingTable && (
          <div className="absolute inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
            <Spinner size={60} color="#ef4444" />
          </div>
        )}
        <DataTable
          columns={columns}
          data={students}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setSelectedStudent(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-bold">Name:</span> {selectedStudent.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {selectedStudent.email}
              </p>
              <p>
                <span className="font-bold">Age:</span> {selectedStudent.age}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;