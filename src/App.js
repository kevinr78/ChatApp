import "./App.css";
import Sidebar from "./components/Sidebar/sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;
