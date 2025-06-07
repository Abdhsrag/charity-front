import { Link } from "react-router-dom";

function CategoryCards({ categories, loading, error }) {
  if (loading) return <div className="text-center py-5">Loading categories...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
  if (!categories.length) return <div className="text-center py-5">No categories found</div>;

  const displayedCategories = categories.slice(0, 4);

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {displayedCategories.map((category) => (
        <div key={category.id} className="col">
          <Link 
            to="/categories" 
            className="card h-100 shadow-sm category-card text-decoration-none"
          >
            <div className="card-body text-center d-flex flex-column">
              <div className="text-primary mb-3">
                <i className="bi bi-tag-fill fs-2" style={{color:"#DBE8F2"}}></i>
              </div>
              <h5 className="card-title text-dark">{category.name}</h5>
              <p className="card-text text-muted small mt-auto">
                {category.description || "Explore projects in this category"}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;