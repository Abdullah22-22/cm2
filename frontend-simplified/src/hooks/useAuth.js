import { useState } from "react";
import { registerUser, loginUser } from "../api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function register(payload) {
    try {
      setLoading(true);
      setError(null);

      const data = await registerUser(payload);
      return data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function login(payload) {
    try {
      setLoading(true);
      setError(null);

      const data = await loginUser(payload);

      // Save token
      localStorage.setItem("token", data.token);

      setUser(data.user);
      return data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, error, register, login };
}