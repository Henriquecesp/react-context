import React from "react";
import Login from "./components/login";
import Profile from "./components/profile";
import { useAuth } from "./providers/auth";

function App() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="App">
      <h1>Ola mundo</h1>
      <Profile />
      <Login />
    </div>
  );
}

export default App;
