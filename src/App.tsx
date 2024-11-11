import React, { useEffect } from "react";
import { IntegryJS, Helpers } from "@integry/sdk";

import "./App.css";

function App() {
  useEffect(() => {
    const init = async () => {
      // Fill these in from the SDK deployment page
      const appKey = "<YOUR APP KEY>";
      const appSecret = "YOUR APP SECRET";
      const userId = "<USER ID>";

      const hash = await Helpers.getAuthHash(userId, appSecret);

      const integry = new IntegryJS({
        appKey,
        hash,
        user: {
          userId,
        },
      });
      integry.isConnected("slack").then((authorization_id: string) => {
        /**
         * returns the authorization_id if the app is connected
         * otherwise returns false
         */
        if (authorization_id) {
          renderFunctionUI(integry);
        } else {
          integry.connect("slack").then((response: any) => {
            renderFunctionUI(integry);
          });
        }
      });
    };
    init();
  }, []);

  function renderFunctionUI(integry: IntegryJS) {
    integry
      .renderFunctionUI("slack-post-message", {}, "")
      .then((result: any) => {
        integry
          .invokeFunction(result)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="App">
      <div className="App-embed" id="my-sdk-container" />
    </div>
  );
}

export default App;
