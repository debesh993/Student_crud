import { useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import LoadingRing from "./LoadingRing"; 

const StudentForm = () => {
  const { addStudent, loading } = useContext(StudentContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [showLoading, setShowLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const { name, email, age } = formData;

    if (!name || !email || !age) {
      toast.error("All fields are required");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setShowLoading(true); 
      await addStudent(formData);

      setTimeout(() => {
        setShowLoading(false); 
        toast.success("Student added successfully 🎉");
        navigate("/"); 
      }, 3000);
    } catch (err) {
      setShowLoading(false);
      toast.error(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6 relative">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-lg md:text-xl"
      >
        <HiArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
        Back
      </button>

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Student
        </h2>

        {showLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-50">
            <LoadingRing size={12} color="indigo" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter student email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter student age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || showLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center"
          >
            {loading || showLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </span>
            ) : (
              "Add Student"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;