import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api/project/project';

export const useProjects = (endpoint) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch projects`);
      const data = await response.json();
      setProjects(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProjectImages = (projects) => {
  const [images, setImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const fetchProjectImage = useCallback(async (projectId) => {
    try {
      const res = await fetch(`${API_BASE}/${projectId}/details/`);
      if (!res.ok) throw new Error("Failed to fetch image");
      const data = await res.json();
      return data.images && data.images.length > 0 ? data.images[0] : null;
    } catch (error) {
      console.error(`Error fetching image for project ${projectId}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const fetchAllImages = async () => {
      const imagesMap = {};
      await Promise.all(
        projects.map(async (project) => {
          imagesMap[project.id] = await fetchProjectImage(project.id);
        })
      );
      setImages(imagesMap);
    };

    fetchAllImages();
  }, [projects, fetchProjectImage]);

  const handleImageError = useCallback((projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  }, []);

  return { images, imageErrors, handleImageError };
};

export const useProjectsByCategory = (categoryId) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectsByCategory = useCallback(async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:8000/api/categories/${categoryId}/projects/`);
      if (!response.ok) throw new Error(`Failed to fetch projects for category ${categoryId}`);
      const data = await response.json();
      setProjects(data.data || data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  return {
    expandedCategory,
    projects,
    loading,
    error,
    images,
    imageErrors,
    handleImageError,
    toggleCategory
  };
};