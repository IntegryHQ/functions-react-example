# Integry React Example

This repository demonstrates how to integrate and use Integry SDK within a React application. It shows how to connect to third-party applications (like Mailchimp), check their connection status, and execute functions using the Integry SDK.

## Prerequisites

Before you start, you’ll need the following:

1. Integry account: If you don’t have one, sign up at Integry.
2. Integry SDK: This project uses the @integry/sdk package to interact with Integry functions.
3. API credentials: You’ll need the appKey, appSecret from your Integry account to authenticate.

## Features

1. Connect to Third-Party Apps: The example demonstrates connecting to the Mailchimp app using the Integry SDK.
2. Invoke Integry Functions: Once connected, you can invoke functions (e.g. mailchimp-add-member-to-list) from the Integry platform.
3. Custom UI Rendering: The app dynamically renders the function UI using Integry's `renderFunctionUI`.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/IntegryHQ/functions-react-example.git
```

2. Navigate to the project directory:

```bash
cd functions-react-example
```

3. Install the dependencies using Yarn or NPM:

```bash
yarn install
```

Or, if you are using npm:

```bash
npm install
```

4. Make sure to replace the appKey, appSecret, and userId in the App.js file with your own credentials from Integry.
