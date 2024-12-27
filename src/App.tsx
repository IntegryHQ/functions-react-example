import React, { useEffect } from "react";
import { IntegryJS, Helpers } from "@integry/sdk";

import "./App.css";

function App() {
  
  const appKey = "<YOUR APP KEY>";
  const appSecret = "YOUR APP SECRET";
  const userId = "<USER ID>";

  useEffect(() => {
    const init = async () => {
      // Fill these in from the SDK deployment page

      const hash = await Helpers.getAuthHash(userId, appSecret);

      const integry = new IntegryJS({
        appKey,
        hash,
        user: {
          userId,
        },
      });
      integry.isAppConnected("slack").then((authorization_id: string) => {
        /**
         * returns the authorization_id if the app is connected
         * otherwise returns false
         */
        if (authorization_id) {
          renderFunctionUI(integry);
        } else {
          integry.connectApp("slack").then((response: any) => {
            renderFunctionUI(integry);
          });
        }
      });
    };
    init();
  }, []);

  function renderFunctionUI(integry: IntegryJS) {
    const params = {
      channel: "alert",
      text: "Hello, team!"
    };
    
    integry.showFunction("slack-post-message", params).then((result) => {
      console.log("Function parameters filled-in by the user:", result);
      //invoking the function
      const newParams = {
        channel: result.channel,
        text: result.text
      }
      const additionalInfo = {}
      integry.callFunction("slack-post-message", newParams, additionalInfo, userId).then((result) => {
        console.log("Received response from Slack:", result);
      }).catch((error) => {
        console.error("Failed to invoke function:", error);
      });
      
    }).catch((error) => {
      console.error("Failed to load function UI:", error);
    });    
  }

  return (
    <div className="App">
      <div className="App-embed" id="my-sdk-container" />
    </div>
  );
}

export default App;
