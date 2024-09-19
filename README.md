# Project Setup and Usage

## About the Project

This project is a web application that allows users to manage and monitor AWS resources. It provides a
user-friendly interface to filter, search, and view the resources across different AWS regions. The
application leverages modern React practices, Redux for state management, and integrates with AWS SDK to fetch instance
data.

## Use Case

The primary use case of this application is to enable cloud administrators and developers to efficiently view and
manage their AWS resources. Users can:

- View a list of resources in their selected AWS region.
- Filter and search resources.

## Project Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:pritamsoni-hsr/aws-ui.git
   cd aws-ui
   ```

2. **Install dependencies:** Make sure you have Bun installed, then run:

   ```bash
   bun install
   ```

3. **Set up environment variables:** Create a `.env` file in the root directory and add your AWS credentials:

   ```plaintext
   VITE_AWS_ACCESS_KEY_ID=<your-access-key-id>
   VITE_AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   VITE_AWS_SESSION_TOKEN=<your-session-token>
   ```

4. **Run the application:** Start the development server:

   ```bash
   bun run dev
   ```

5. **Access the application:** Open your browser and navigate to `http://localhost:5173` to view the application.

## Additional Information

For more details on how to use the application, refer to the documentation provided within the codebase or the comments
in the components.

Feel free to contribute to the project by submitting issues or pull requests.
