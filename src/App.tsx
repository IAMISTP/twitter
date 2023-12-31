import Router from "components/Router";
import Layout from "components/Layout";
import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
