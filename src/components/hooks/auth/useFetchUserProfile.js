import { useEffect } from "react";
import axios from "axios";

export const useFetchUserProfile = (token, user_id) => {
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !user_id) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;

        localStorage.setItem("first_name", user.fname || "");
        localStorage.setItem("last_name", user.lname || "");
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, [token, user_id]);
};
