import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Switch, Routes, Route } from "react-router-dom"
import Reservation from "./pages/Reservation";
import Manager from "./pages/Manager";
import Auth from "./pages/Auth";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/Reserve/:username" element={<Reservation/>} exact></Route>
        <Route path="/Manager" element={<Manager />} exact></Route>
        <Route path="/auth" element={<Auth />} exact></Route>
        <Route path='/auth/change-password/:id' element={<Auth resetPass={true} />}>
        </Route>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
