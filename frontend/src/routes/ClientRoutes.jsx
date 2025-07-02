import React from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../pages/principals/ClientLayout";
import ProtectedRoute from '../layout/ProtectedLayout';

import Dashboard from "../pages/client/Dashboard";
import TrackingProject from "../pages/client/TrackingProject";
import Help from "../pages/client/Help";
;

const ClientRoutes = () => (
    <>
      <Route element={<ProtectedRoute rolesPermitidos={[4]} />}> {/* Solo rol 4 (client) */}
        <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tracking" element={<TrackingProject />} />
            <Route path="help" element={<Help />} />
          </Route>
      </Route>
      </> 

);

export default ClientRoutes;
