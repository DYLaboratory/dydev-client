import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = Component =>
  function loader(props) {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };

/** Pages */
/* Dashboard */
const Dashboard = Loader(lazy(() => import('src/content/pages/Dashboard')));

/* Introduction */
const About = Loader(
  lazy(() => import('src/content/pages/Introduction/About'))
);

/* Blog */

/* Others */
const Site = Loader(lazy(() => import('src/content/pages/Others/Site')));

/* Login */
const Login = Loader(lazy(() => import('src/content/pages/Login')));

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  /* login */
  {
    path: '/login',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Login />
      }
    ]
  },

  /* dashboard */
  {
    path: '/dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },

  /* introduction */
  {
    path: 'introduction',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="about" replace />
      },
      {
        path: 'about',
        // element: <About />
        element: <StatusComingSoon isMain />
      },
      {
        path: 'intro',
        // element: <UserProfile />
        element: <StatusComingSoon isMain />
      },
      {
        path: 'notice',
        // element: <Transactions />
        element: <StatusComingSoon isMain />
      }
    ]
  },

  /* blog */
  {
    path: 'blog',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="blog" replace />
      },
      {
        path: 'blog',
        // element: <UserSettings />
        element: <StatusComingSoon isMain />
      },
      {
        path: 'feed',
        // element: <UserSettings />
        element: <StatusComingSoon isMain />
      }
    ]
  },

  /* others */
  {
    path: 'others',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="site" replace />
      },
      {
        path: 'site',
        element: <Site />
      }
    ]
  },

  /* sample */
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },

  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  },

  // Error
  {
    path: '/*',
    element: <Navigate to="/status/404" replace />
  }
];

export default routes;
