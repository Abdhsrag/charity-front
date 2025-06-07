import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/project/project";

export const useProjects = (endpoint) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    axios.get(`${API_BASE}${endpoint}`)
      .then(response => {
        setProjects(response.data.data || response.data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProjectImages = (projects) => {
  const [images, setImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const fetchProjectImage = useCallback((projectId) => {
    return axios.get(`${API_BASE}/${projectId}/details/`)
      .then(res => {
        return res.data.images && res.data.images.length > 0 ? res.data.images[0] : null;
      })
      .catch(error => {
        console.error(`Error fetching image for project ${projectId}:`, error);
        return null;
      });
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const fetchAllImages = () => {
      const imagesMap = {};
      Promise.all(
        projects.map((project) => {
          return fetchProjectImage(project.id).then(image => {
            imagesMap[project.id] = image;
          });
        })
      ).then(() => {
        setImages(imagesMap);
      });
    };

    fetchAllImages();
  }, [projects, fetchProjectImage]);

  const handleImageError = useCallback((projectId) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  }, []);

  return { images, imageErrors, handleImageError };
};

export const useProjectsByCategory = (categoryId) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectsByCategory = useCallback(() => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);
    axios.get(`http://localhost:8000/api/categories/${categoryId}/projects/`)
      .then(response => {
        const limitedProjects = (response.data.data || response.data).slice(0, 4);
        setProjects(limitedProjects);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  useEffect(() => {
    fetchProjectsByCategory();
  }, [fetchProjectsByCategory]);

  return { projects, loading, error, refetch: fetchProjectsByCategory };
};

export const useCategoryProjects = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { projects, loading, error } = useProjectsByCategory(expandedCategory);
  const { images, imageErrors, handleImageError } = useProjectImages(projects);

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
