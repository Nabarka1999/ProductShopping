import { useState } from "react";
import "./App.css";
import ResponsiveDrawer from "./components/LeftSection";
import RightSection from "./components/RightSection";

function App() {
  const [sortOrder, setSortOrder] = useState("");

  return (
    <>
      <ResponsiveDrawer setSortOrder={setSortOrder} />
      <RightSection sortOrder={sortOrder} />
    </>
  );
}

export default App;
