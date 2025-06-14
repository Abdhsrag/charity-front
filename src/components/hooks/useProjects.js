import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/project/project";

export const useProjects = (endpoint, token) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    axios.get(`${API_BASE}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setProjects((response.data.data || response.data).filter(project => !project.is_cancle));
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProjectImages = (projects, token) => {
  const [images, setImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const fetchProjectImage = useCallback((projectId) => {
    return axios.get(`${API_BASE}/${projectId}/details/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        return res.data.images && res.data.images.length > 0 ? res.data.images[0] : null;
      })
      .catch(error => {
        console.error(`Error fetching image for project ${projectId}:`, error);
        return null;
      });
  }, [token]);

  useEffect(() => {
    if (projects.length === 0) return;

    const fetchAllImages = async () => {
      const imagesMap = {};
      for (const project of projects) {
        const image = await fetchProjectImage(project.id);
        imagesMap[project.id] = image;
      }
      setImages(imagesMap);
    };

    fetchAllImages();
  }, [projects, fetchProjectImage]);

  const handleImageError = useCallback((projectId) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  }, []);

  return { images, imageErrors, handleImageError };
};

export const useProjectsByCategory = (categoryId, token) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectsByCategory = useCallback(() => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);
    axios.get(`http://localhost:8000/api/categories/${categoryId}/projects/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const limitedProjects = (response.data.data || response.data).filter(project => !project.is_cancle).slice(0, 4);
        setProjects(limitedProjects);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, token]);

  useEffect(() => {
    fetchProjectsByCategory();
  }, [fetchProjectsByCategory]);

  return { projects, loading, error, refetch: fetchProjectsByCategory };
};

export const useCategoryProjects = (token) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { projects, loading, error } = useProjectsByCategory(expandedCategory, token);
  const { images, imageErrors, handleImageError } = useProjectImages(projects, token);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  return {
    expandedCategory,
    projects,
    loading,
    error,
    images,
    imageErrors,
    handleImageError,
    toggleCategory,
  };
};
