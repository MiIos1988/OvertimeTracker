import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import amplifyConfig from "./amplifyconfiguration.json";
import MainComponent from "./components/MainComponent";
Amplify.configure(amplifyConfig);

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      try {
        if (isAuthenticated) {
          const authToken = (
            await fetchAuthSession()
          ).tokens?.idToken?.toString();
          console.log(authToken);
          if (authToken) {
            setJwtToken(authToken);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchToken();
  }, [isAuthenticated]);
  
  return (
    <Authenticator >
      {({ signOut, user }) => (
        <main>
          <MainComponent user={user} onSignOut={signOut} setIsAuthenticated={setIsAuthenticated} />
        </main>
      )}
    </Authenticator>
  );
}

export default App;
