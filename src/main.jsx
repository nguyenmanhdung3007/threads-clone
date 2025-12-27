import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
// import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  //   <ErrorBoundary>
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
  //   </ErrorBoundary>
);
