import { useState, useEffect } from "react";
import axios from "axios";

function useCategory(token) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = () => {
      axios.get("http://localhost:8000/api/categories/", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          if (!Array.isArray(response.data)) {
            throw new Error("Expected an array of categories");
          }
          setCategories(response.data);
          setError(null);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setError(err.message);
          setCategories([]);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCategories();
  }, [token]);

  return { categories, loading, error };
};

export default useCategory;
