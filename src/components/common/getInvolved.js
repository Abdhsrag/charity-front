import { Link } from 'react-router-dom';
const GetInvolvedSection = () => (
  <section className="get-involved text-center py-5">
    <h2>Get Involved</h2>
    <p>Join our community of changemakers and make a difference.</p>
    <div className="d-flex justify-content-center gap-3 mt-3">
      <Link to="/volunteer" className="btn volunteer-btn">
        Volunteer
      </Link>
      <Link to="/donate" className="btn donate-btn">
        Donate
      </Link>
    </div>
  </section>
);

export default GetInvolvedSection;