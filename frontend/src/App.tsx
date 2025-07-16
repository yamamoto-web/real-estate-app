import './App.css'
import Greeting from "./components/Greeting";

// Appコンポーネント
function App() {
  return (
    <div>
      <h1>Hello, React + TypeScript!</h1>
      {/* Propsとしてnameを渡す */}
      <Greeting name="太郎" />
      <Greeting name="花子" />
    </div>
  );
}

export default App;
