import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<MainLayout />}>

        <Route
          index
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/HomePage" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/add-job" element={<AddJobPage />} />
          <Route path="/edit-job/:id" element={<EditJobPage />} />
          <Route path="/jobs/:id" element={<JobPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
