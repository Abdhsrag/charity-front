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
  Spinner,
  Modal,
} from "react-bootstrap";
import {
  Users,
  Calendar,
  MessageCircle,
  BookOpen,
  Award,
  Flag,
  Reply,
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
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportProjectModal, setShowReportProjectModal] = useState(false);
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const projectId = window.location.pathname.split("/").filter(Boolean).pop();

  useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const baseUrl = "http://127.0.0.1:8000";

      // Fetch project, donations, and images first
      const [projectRes, donationsRes, imagesRes] = await Promise.all([
        fetch(`${baseUrl}/api/project/project/${projectId}/details/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/api/donation/by-project/${projectId}/`, {
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
      const donations = await donationsRes.json();

      // Then fetch comments with replies
      const comments = await fetchCommentsWithReplies();

      setProjectData({
        ...project,
        target: Number(project.target) || 0,
        images: imagesData.data || [],
        owner: { ...owner },
      });

      setDonationsData(donations || []);
      setCommentsData(comments || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [projectId, token]);

const fetchCommentsWithReplies = async () => {
  try {
    const commentsRes = await fetch(
      `http://localhost:8000/api/comments/by-project/${projectId}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!commentsRes.ok) throw new Error("Failed to load comments");

    const comments = await commentsRes.json();

    // Fetch replies for each comment in parallel
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        try {
          const repliesRes = await fetch(
            `http://localhost:8000/api/comments/replies/${comment.id}/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const replies = repliesRes.ok ? await repliesRes.json() : [];
          return { ...comment, replies };
        } catch (err) {
          console.error(`Error fetching replies for comment ${comment.id}:`, err);
          return { ...comment, replies: [] };
        }
      })
    );

    return commentsWithReplies;
  } catch (err) {
    console.error("Error fetching comments:", err);
    setError("Failed to load comments");
    return [];
  }
};





  const fetchReplies = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/replies/${commentId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to load replies");
      return await response.json();
    } catch (err) {
      console.error("Error fetching replies:", err);
      return [];
    }
  };

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      showAlertMessage("Invalid authentication", "danger");
      return;
    }

    // Optimistic update
    const tempComment = {
      id: Date.now(),
      content: newComment,
      user_id: decodedToken.user_id,
      created_at: new Date().toISOString(),
      user: { first_name: "", last_name: "" },
      replies: []
    };

    setCommentsData([tempComment, ...commentsData]);
    setNewComment("");

    try {
      const response = await fetch("http://localhost:8000/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          project_id: parseInt(projectId),
          user_id: decodedToken.user_id,
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      // Refresh comments after successful post
      await fetchCommentsWithReplies();
      showAlertMessage("Comment posted successfully!", "success");
    } catch (err) {
      // Rollback optimistic update
      setCommentsData(commentsData.filter(c => c.id !== tempComment.id));
      showAlertMessage("Failed to post comment: " + err.message, "danger");
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo) return;

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      showAlertMessage("Invalid authentication", "danger");
      return;
    }

    // Optimistic update
    const tempReply = {
      id: Date.now(),
      content: replyContent,
      user_id: decodedToken.user_id,
      created_at: new Date().toISOString(),
      user: { first_name: "", last_name: "" }
    };

    setCommentsData(commentsData.map(comment => 
      comment.id === replyingTo
        ? { ...comment, replies: [...comment.replies, tempReply] }
        : comment
    ));
    setReplyContent("");
    setReplyingTo(null);

    try {
      const response = await fetch("http://localhost:8000/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: replyContent,
          project_id: parseInt(projectId),
          user_id: decodedToken.user_id,
          parent: replyingTo,
        }),
      });

      if (!response.ok) throw new Error("Failed to post reply");

      // Refresh comments after successful post
      await fetchCommentsWithReplies();
      showAlertMessage("Reply posted successfully!", "success");
    } catch (err) {
      // Rollback optimistic update
      setCommentsData(commentsData.map(comment => 
        comment.id === replyingTo
          ? { ...comment, replies: comment.replies.filter(r => r.id !== tempReply.id) }
          : comment
      ));
      showAlertMessage("Failed to post reply: " + err.message, "danger");
    }
  };

   const renderComments = () => {
    if (commentsData.length === 0) {
      return (
        <p className="text-muted text-center py-4">
          No comments yet. Be the first to show your support!
        </p>
      );
    }

    return commentsData.map((comment) => (
      <React.Fragment key={comment.id}>
        <Card className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title>
                {comment.user?.first_name} {comment.user?.last_name}
              </Card.Title>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => openReportCommentModal(comment.id)}
              >
                <Flag size={16} />
              </Button>
            </div>
            <Card.Text>{comment.content}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
             {/* <small className="text-muted">
                {new Date(comment.created_at).toLocaleString()}
              </small>*/}
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setReplyingTo(comment.id === replyingTo ? null : comment.id)}
              >
                <Reply size={16} className="me-1" />
                {comment.id === replyingTo ? "Cancel" : "Reply"}
              </Button>
            </div>

            {replyingTo === comment.id && (
              <Form onSubmit={handleReplySubmit} className="mt-3">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Reply to ${comment.user?.first_name}...`}
                  required
                />
                <div className="d-flex justify-content-end mt-2">
                  <Button variant="primary" size="sm" type="submit">
                    Post Reply
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>

        {/* Replies section */}
        {comment.replies?.length > 0 && (
          <div className="ms-4">
            {comment.replies.map((reply) => (
              <Card key={reply.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>
                      {reply.user?.first_name} {reply.user?.last_name}
                    </Card.Title>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openReportCommentModal(reply.id)}
                    >
                      <Flag size={16} />
                    </Button>
                  </div>
                  <Card.Text>{reply.content}</Card.Text>
                 {/* <small className="text-muted">
                    {new Date(reply.created_at).toLocaleString()}
                  </small>*/}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </React.Fragment>
    ));
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

  const handleReportProject = async () => {
    if (!reportDescription.trim()) {
      showAlertMessage("Please enter a report description", "danger");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/project-reports/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: reportDescription,
            date: new Date().toISOString().split("T")[0],
            user_id: 1,
            project_id: parseInt(projectId),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit project report");

      setReportDescription("");
      setShowReportProjectModal(false);
      showAlertMessage("Project report submitted successfully!", "success");
    } catch (err) {
      showAlertMessage("Failed to submit report: " + err.message, "danger");
    }
  };

  const handleReportComment = async () => {
    if (!reportDescription.trim() || !selectedCommentId) {
      showAlertMessage("Please enter a report description", "danger");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/comment-reports/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: reportDescription,
            date: new Date().toISOString().split("T")[0],
            user: 1,
            comment: selectedCommentId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment report");

      setReportDescription("");
      setSelectedCommentId(null);
      setShowReportCommentModal(false);
      showAlertMessage("Comment report submitted successfully!", "success");
    } catch (err) {
      showAlertMessage("Failed to submit report: " + err.message, "danger");
    }
  };

  const openReportCommentModal = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReportCommentModal(true);
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

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0";
    return `$${parseFloat(value).toLocaleString()}`;
  };

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

        <Modal
          show={showReportProjectModal}
          onHide={() => setShowReportProjectModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Report Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Explain why you're reporting this project..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReportProjectModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReportProject}>
              Submit Report
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showReportCommentModal}
          onHide={() => setShowReportCommentModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Report Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Explain why you're reporting this comment..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReportCommentModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReportComment}>
              Submit Report
            </Button>
          </Modal.Footer>
        </Modal>

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
                          e.target.src = "/image-fallback.png";
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
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setShowReportProjectModal(true)}
                  >
                    <Flag size={16} className="me-1" /> Report Project
                  </Button>
                </div>
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
          <Form onSubmit={handleCommentSubmit} className="mb-4">
                  <Form.Group>
                    <Form.Label>Add a comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this project..."
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-2">
                    <Button variant="primary" type="submit">
                      Post Comment
                    </Button>
                  </div>
                 </Form>
          {renderComments()}
        </Card.Body>
      </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectDetails;