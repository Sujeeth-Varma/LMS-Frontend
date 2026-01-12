import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import TestList from "../../../components/admin/tests/TestList";
import CreateTestPage from "./tests/CreateTestPage";
import TestDetailPage from "./tests/TestDetailPage";
import ResultsPage from "./tests/ResultsPage";
import QuestionManagementPage from "./tests/QuestionManagementPage";

const AdminRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="tests" element={<TestList />} />
      <Route path="tests/create" element={<CreateTestPage />} />
      <Route path="tests/:id" element={<TestDetailPage />} />
      <Route path="tests/:id/questions" element={<QuestionManagementPage />} />
      <Route path="results" element={<ResultsPage />} />
    </Routes>
  );
};

export default AdminRouter;