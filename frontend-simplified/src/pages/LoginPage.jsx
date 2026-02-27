import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      toast.success("Login successful ");
      navigate("/HomePage");
    } catch (error) {
      toast.error("Login failed ");
    }
  }

return (
  <section className="bg-indigo-50">
    <div className="container m-auto py-10 px-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3"
              placeholder="Antti@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </section>
);
};

export default LoginPage;