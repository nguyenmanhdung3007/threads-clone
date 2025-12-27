import { BrowserRouter as Router, Routes, Route } from "react-router";
import routes from "./routes";
import { Fragment, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import DelayFallback from "./components/DelayFallback";

function Loading() {
  console.log("Loading...");
  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          // <DelayFallback delay={1000}>
          <Loading />
          // </DelayFallback>
        }
      >
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout;
            return (
              <Route key={index} element={<Layout />}>
                {route.children.map((child, index) => {
                  const Comp = child.component;
                  const PrivateWrapper = child.private
                    ? PrivateRoute
                    : Fragment;
                  return (
                    <Route
                      key={index}
                      path={child.path}
                      element={
                        <PrivateWrapper>
                          <Comp />
                        </PrivateWrapper>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
