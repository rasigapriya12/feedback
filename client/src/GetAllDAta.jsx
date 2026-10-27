
import axios from "axios";
import { useEffect, useState } from "react";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getfeedback")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Feedback List</h1>

      <a href="/">Back to Survey</a>

      {feedbacks.length === 0 && (
        <p>No feedback submitted yet.</p>
      )}

      {feedbacks.map((feedback) => (
        <div key={feedback._id}>
          <p><strong>Name:</strong> {feedback.q1}</p>
          <p><strong>Department:</strong> {feedback.q2}</p>
          <p><strong>Session Title:</strong> {feedback.q3}</p>
          <p><strong>Feedback:</strong> {feedback.q4}</p>
          <p><strong>Suggestions:</strong> {feedback.q5}</p>
          <p>
            <strong>Submitted At:</strong>{" "}
            {new Date(feedback.submittedAt).toLocaleString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default GetAllDAta;
