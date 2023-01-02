import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Switch, Routes, Route } from "react-router-dom"
import Reservation from "./pages/Reservation";
import Manager from "./pages/Manager";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Reservation />} exact></Route>
        <Route path="/Reserve/:username" element={<Reservation/>} exact></Route>
        <Route path="/Manager/:username" element={<Manager />} exact></Route>
        <Route path="/Admin" element={<Admin />} exact></Route>
        <Route path="/auth" element={<Auth />} exact></Route>

        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
