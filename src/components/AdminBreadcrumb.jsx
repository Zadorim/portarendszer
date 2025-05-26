// src/components/AdminBreadcrumb.js
import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const routeMap = {
  "/admin/tanulok": "Tanulók",
  "/admin/tantermek": "Tantermek",
  "/admin/osztalyok": "Osztályok"
};

function AdminBreadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      {paths.map((path, index) => {
        const route = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        
        return (
          <Breadcrumb.Item 
            key={route} 
            active={isLast}
            linkAs={isLast ? undefined : Link}
            linkProps={isLast ? undefined : { to: route }}
          >
            {routeMap[route] || path}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default AdminBreadcrumb;