const Loading = ({ message = "Loading..." }) => (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2">{message}</p>
  </div>
);
export default Loading;