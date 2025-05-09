import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
