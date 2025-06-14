import React, { useState } from "react";

function Search({ projects, setFilteredProjects }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter((project) => {
      const inTitle = project.title.toLowerCase().includes(term);
      const inTags = project.tags?.some((tag) => tag.toLowerCase().includes(term));
      return inTitle || inTags;
    });

    setFilteredProjects(filtered);
  };

  return (
    <div className="input-group input-group-sm mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for project..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
