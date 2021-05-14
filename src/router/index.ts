import React from 'react'

export const Routes = [
  {
    path: '/',
    name: 'index',
    component: React.lazy(() => import('../pages/index')),
  },
  {
    path: '/draft',
    name: 'draft',
    component: React.lazy(() => import('../pages/draft')),
  },
  {
    path: '/article',
    name: 'article',
    component: React.lazy(() => import('../pages/article')),
  },
  {
    path: '/result',
    name: 'result',
    component: React.lazy(() => import('../pages/result')),
  },
  {
    path: '*',
    name: 'error-404',
    component: React.lazy(() => import('../pages/error/error-404')),
  },
]
