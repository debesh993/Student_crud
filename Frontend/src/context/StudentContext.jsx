import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StudentContext = createContext();

const API_URL = "http://localhost:3000/students";

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStudents(res.data);
      return res.data; 
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData) => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL, studentData);
      setStudents((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setStudents((prev) =>
        prev.map((student) => (student._id === id ? res.data : student))
      );
      return res.data;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents().catch((err) => {
      console.error("Initial fetch failed:", err);
    });
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        fetchStudents,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};