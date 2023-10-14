import Home from "@/pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "../nav";

export default function RouterComponent() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
  );
}
