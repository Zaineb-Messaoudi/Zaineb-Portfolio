import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/ui/LoadingScreen";

import HomePage from "./pages/HomePage";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingExiting, setLoadingExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setLoadingExiting(true), 350);
    const removeTimer = window.setTimeout(() => setLoading(false), 900);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {loading ? <LoadingScreen isExiting={loadingExiting} /> : null}
    </>
  );
}

export default App;
