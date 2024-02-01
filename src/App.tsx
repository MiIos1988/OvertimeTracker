import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import amplifyConfig from "./amplifyconfiguration.json";
import MainComponent from "./components/MainComponent";
Amplify.configure(amplifyConfig);

function App() {
  const [jwtToken, setJwtToken] = useState(null);
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <MainComponent user={user} onSignOut={signOut} />
        </main>
      )}
    </Authenticator>
  );
}

export default App;
