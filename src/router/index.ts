import React from "react";

export const Routes = [
  {
    path: "/",
    name: "index",
    component: React.lazy(() => import("../pages/index")),
  },
  {
    path: "/draft",
    name: "draft",
    component: React.lazy(() => import("../pages/draft")),
  },
  {
    path: "/article",
    name: "article",
    component: React.lazy(() => import("../pages/article")),
  },
];
