import { useState } from "react";
import './App.css';
import PrivateRoutes from "./components/PrivateRoutes";
import LocalStorageService from "./_services/localStorage";

function App() {
  const [isLogin, setIsLogin] = useState(LocalStorageService.getAuthStatus());

  return (
    <div className="App">
      <PrivateRoutes isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}

export default App;
