import Home from "@/pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "../nav";

export default function RouterComponent() {
  return (
    <Router>
      <Nav />
      <div className="px-4 pt-2 mt-2">
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}
