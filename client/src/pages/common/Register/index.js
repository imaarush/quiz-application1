import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen" style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div className="card w-400 p-3 bg-white" style={{ borderRadius: 16 }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <i className="ri-questionnaire-line" style={{ fontSize: 28, color: "var(--primary)" }}></i>
            <h1 className="text-2xl" style={{ color: "var(--gray-800)" }}>QuizMaster</h1>
          </div>
          <p style={{ color: "var(--gray-500)", marginTop: 4, fontSize: 14 }}>Create your account to get started</p>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="name" label="Full Name">
              <input type="text" placeholder="Enter your name" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="text" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" placeholder="Create a password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Create Account
              </button>
              <Link to="/login">Already have an account? Sign in</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
