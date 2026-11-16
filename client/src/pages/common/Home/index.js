import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--gray-900)" }}>
            Welcome back, {user.name} 👋
          </h1>
          <p style={{ color: "var(--gray-500)", marginTop: 4 }}>
            Choose an exam below to get started
          </p>
        </div>
        <Row gutter={[24, 24]}>
          {exams.map((exam) => (
            <Col span={6} key={exam._id}>
              <div className="card-lg flex flex-col" style={{ height: "100%" }}>
                <div style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid var(--gray-100)",
                  background: "linear-gradient(135deg, var(--primary-light) 0%, #f0f0ff 100%)"
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "var(--primary)", display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: 12
                  }}>
                    <i className="ri-file-list-3-line" style={{ color: "white", fontSize: 20 }}></i>
                  </div>
                  <h1 className="text-xl" style={{ color: "var(--gray-900)" }}>{exam?.name}</h1>
                </div>
                <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--gray-500)", fontSize: 13 }}>Category</span>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "var(--gray-700)" }}>{exam.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--gray-500)", fontSize: 13 }}>Total Marks</span>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "var(--gray-700)" }}>{exam.totalMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--gray-500)", fontSize: 13 }}>Passing Marks</span>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "var(--gray-700)" }}>{exam.passingMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--gray-500)", fontSize: 13 }}>Duration</span>
                      <span style={{ fontWeight: 600, fontSize: 13, color: "var(--gray-700)" }}>{exam.duration}s</span>
                    </div>
                  </div>
                  <button
                    className="primary-contained-btn w-100"
                    style={{ marginTop: 20 }}
                    onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                  >
                    <i className="ri-play-circle-line"></i>
                    Start Exam
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
