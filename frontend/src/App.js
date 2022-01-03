import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState();

  const onLogin = async () => {
    await axios.post(`api/login`);
    const { status } = await axios.get(`api/validate`);
    if (status !== 200) {
      alert("login failed");
      return;
    }
    setIsLogged(true);
  };

  const onLogout = async () => {
    const { status } = await axios.post(`api/logout`);
    if (status === 200) {
      setIsLogged(false);
      return;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLogged && (
          <button className="App-login-btn" onClick={onLogin}>
            Login
          </button>
        )}
        {isLogged && (
          <div>
            <h4>Welcome back</h4>
            <button className="App-login-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
