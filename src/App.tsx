import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import amplifyConfig from "./amplifyconfiguration.json";
import MainComponent from "./components/MainComponent";
Amplify.configure(amplifyConfig);

function App() {
  return (
    <Authenticator className="mt-16">
      {({ signOut, user }) => (
        <main>
          <MainComponent user={user} onSignOut={signOut} />
        </main>
      )}
    </Authenticator>
  );
}

export default App;
