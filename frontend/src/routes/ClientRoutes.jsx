import React from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../pages/principals/ClientLayout";

const ClientRoutes = () => (
  <Route path="/client" element={<ClientLayout />} />
);

export default ClientRoutes;
