import { useAuth } from "./provider/useAuth";

function App() {
  const { isAuthenticated, isInitialized, login, logout, user } = useAuth();
  return (
    <>
      {user?.name || "No user"}
      <br />
      {user?.email || "No email"}
      <br />
      {isInitialized ? "iniciado" : "não iniciado"}
      <br />
      {isAuthenticated ? "autenticado" : "não autenticado"}
      <br />
      <button
        onClick={() => {
          if (isAuthenticated) {
            logout();
          } else {
            login("henrique", "henriquecesp.dev");
          }
        }}
      >
        Click
      </button>
    </>
  );
}

export default App;
