import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  Image,
  Form,
  Alert,
  Carousel,
  Nav,
  Navbar,
  Spinner,
} from "react-bootstrap";
import {
  Heart,
  Users,
  Calendar,
  Mail,
  Phone,
  Target,
  MessageCircle,
  Share2,
  BookOpen,
  Award,
} from "lucide-react";
import "../App.css";

const ProjectDetails = ({ token }) => {
  const [projectData, setProjectData] = useState({
    title: "",
    details: "",
    target: 0,
    E_time: new Date().toISOString(),
    images: [],
    owner: {
      fname: "",
      lname: "",
      email: "",
      mphone: "",
      image: "",
    },
  });
  const [donationsData, setDonationsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const projectId = window.location.pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const baseUrl = "http://127.0.0.1:8000";
        const [projectRes, donationsRes, commentsRes, imagesRes] =
          await Promise.all([
            fetch(`${baseUrl}/api/project/project/${projectId}/details/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${baseUrl}/api/donation/by-project/${projectId}/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${baseUrl}/api/comments/by-project/${projectId}/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${baseUrl}/api/project-images/for-project/${projectId}/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (!projectRes.ok) throw new Error("Failed to load project data");
        if (!donationsRes.ok) throw new Error("Failed to load donations data");

        const responseData = await projectRes.json();
        const project = responseData.project;
        const owner = project.owner || responseData.owner || {};

        const imagesData = await imagesRes.json();

        setProjectData((prev) => ({
          ...prev,
          ...project,
          target: Number(project.target) || 0,
          images: imagesData.data || [], // <- Update here
          owner: {
            ...prev.owner,
            ...owner,
          },
        }));

        const donations = await donationsRes.json();
        const comments = commentsRes.ok ? await commentsRes.json() : [];

        setDonationsData(donations || []);
        setCommentsData(comments || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId, token]);

  // Safe value formatting
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0";
    return `$${parseFloat(value).toLocaleString()}`;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      showAlertMessage("Please enter a valid donation amount", "danger");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/donation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: donationAmount,
          date: new Date().toISOString(),
          user: 1,
          project: parseInt(projectId),
        }),
      });

      if (!response.ok) throw new Error("Donation failed");

      // Refresh donations
      const donationsRes = await fetch(
        `http://127.0.0.1:8000/api/donation/by-project/${projectId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDonationsData(await donationsRes.json());

      showAlertMessage("Donation successful!", "success");
      setDonationAmount("");
    } catch (err) {
      showAlertMessage("Donation failed: " + err.message, "danger");
    }
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const getDefaultAvatar = (name) => (
    <div
      className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle"
      style={{
        width: "120px",
        height: "120px",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      {name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U"}
    </div>
  );

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Alert variant="danger">
          <h5>Error</h5>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Alert>
      </Container>
    );
  }

  // Calculate metrics with fallbacks
  const totalAmount = donationsData.reduce(
    (sum, d) => sum + (parseFloat(d?.amount) || 0),
    0
  );
  const donationCount = donationsData.length || 0;
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(projectData.E_time) - new Date()) / (1000 * 60 * 60 * 24)
    )
  );
  const progressPercentage = Math.min(
    100,
    (totalAmount / (projectData.target || 1)) * 100
  );

  console.log("Project Response:", projectData);

  return (
    <div className="bg-light min-vh-100">
      <Container className="py-4">
        {showAlert && (
          <Alert
            variant={alertVariant}
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        )}

        <Row className="g-4">
          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Project Owner</h5>
              </Card.Header>
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  {projectData.owner?.image ? (
                    <Image
                      src={projectData.owner.image}
                      roundedCircle
                      width={120}
                      height={120}
                      alt="Owner"
                      onError={(e) => (e.target.src = "")}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    getDefaultAvatar(
                      `${projectData.owner?.fname} ${projectData.owner?.lname}`
                    )
                  )}
                </div>

                <h5 className="fw-bold mb-1">
                  {projectData.owner?.fname} {projectData.owner?.lname}
                </h5>
                <p className="text-muted mb-3">Project Owner</p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Overview</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h6 className="fw-bold">Project Details</h6>
                  <p className="h4 text-success">
                    ${totalAmount.toLocaleString()}
                  </p>
                  <p className="text-muted small">
                    Target: ${projectData.target.toLocaleString()}
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="fw-bold">Doners</h6>
                  <p className="h5">{donationCount}</p>
                </div>
                <div>
                  <h6 className="fw-bold">Days Left</h6>
                  <p className="h5">{daysLeft}</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Project Owner</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h6 className="fw-bold">E-mail</h6>
                  <p className="text-muted">{projectData.owner?.email}</p>
                </div>
                <div>
                  <h6 className="fw-bold">Phone</h6>
                  <p className="text-muted">{projectData.owner?.mphone}</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Make a Donation</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleDonate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Donation Amount ($)</Form.Label>
                    <Form.Control
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100">
                    Donate Now
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h1 className="display-6 fw-bold text-dark mb-2">
                      {projectData.title || "Project Title"}
                    </h1>
                  </div>
                  <div className="text-end">
                    <div className="text-muted small">Project ends in</div>
                    <div className="h4 text-primary fw-bold">
                      {Math.floor(daysLeft)} days
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="text-success fw-bold mb-0">
                      {formatCurrency(totalAmount)}
                    </h5>
                    <span className="text-muted">
                      {progressPercentage.toFixed(0)}% of{" "}
                      {formatCurrency(projectData.target)}
                    </span>
                  </div>
                  <ProgressBar
                    now={progressPercentage}
                    className="mb-3"
                    style={{ height: "12px" }}
                    variant="success"
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>
                      <Users size={16} className="me-1" /> {donationCount}{" "}
                      supporters
                    </span>
                    <span>
                      <Calendar size={16} className="me-1" />{" "}
                      {Math.floor(daysLeft)} days left
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {(projectData.images || []).length > 0 && (
              <Card className="shadow-sm mb-4">
                <Carousel>
                  {projectData.images.map((img, index) => (
                    <Carousel.Item
                      key={index}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        src={img.url}
                        alt={`Project Image ${index + 1}`}
                        className="d-block w-100 h-100"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.src = "/image-fallback.png"; // ✅ Better fallback
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card>
            )}

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h3 className="mb-0">
                  <BookOpen size={24} className="me-2 text-primary" /> About
                  This Project
                </h3>
              </Card.Header>
              <Card.Body>
                <p className="lead text-muted lh-lg">
                  {projectData.details || "No project details available"}
                </p>
              </Card.Body>
            </Card>

            <Row className="g-3 mb-4">
              {[
                {
                  icon: <Users size={48} />,
                  value: "100+",
                  label: "People Impacted",
                  color: "primary",
                },
                {
                  icon: <BookOpen size={48} />,
                  value: "500+",
                  label: "Resources Provided",
                  color: "success",
                },
                {
                  icon: <Award size={48} />,
                  value: "95%",
                  label: "Success Rate",
                  color: "warning",
                },
              ].map((item, i) => (
                <Col md={4} key={i}>
                  <Card className="text-center h-100 shadow-sm border-0">
                    <Card.Body className="py-4">
                      <div className={`text-${item.color} mb-3`}>
                        {item.icon}
                      </div>
                      <h4 className="fw-bold">{item.value}</h4>
                      <p className="text-muted mb-0">{item.label}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h3 className="mb-0">
                  <MessageCircle size={24} className="me-2 text-primary" />{" "}
                  Community Support ({commentsData.length})
                </h3>
              </Card.Header>
              <Card.Body>
                {commentsData.length === 0 ? (
                  <p className="text-muted text-center py-4">
                    No comments yet. Be the first to show your support!
                  </p>
                ) : (
                  commentsData.map((comment) => (
                    <Card className="mb-3" key={comment.id}>
                      <Card.Body>
                        <Card.Title>
                          {comment.user?.first_name} {comment.user?.last_name}
                        </Card.Title>
                        <Card.Text>{comment.content}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectDetails;
