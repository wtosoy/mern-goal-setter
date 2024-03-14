import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import GoalList from "./components/goal/GoalList";
import CreateGoal from "./components/goal/CreateGoal";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          
          <Route index path="/" element={<GoalList />} />
          <Route path="/create-goal" element={<CreateGoal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
