import Top from "./pages/Top/Top";
import Stage from "./pages/Conditions/LifeStage";
import Detail from "./pages/Conditions/Detail";
import Result from "./pages/Result/Result";
import Question from "./pages/Question/Question";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-[100svh] flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <div className="max-w-md mx-auto w-full">
            <Routes>
              <Route path="/" element={<Top />} />
              <Route path="/Conditions/Detail" element={<Detail />} />
              <Route path="/Conditions/LifeStage" element={<Stage />} />
              <Route path="/Result" element={<Result />} />
              <Route path="/Question" element={<Question />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;