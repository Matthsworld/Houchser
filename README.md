# Houchser - Your On-Demand House Chores Service

Houchser is a web application that allows users to book reliable service providers for various house chores. Services include cleaning, laundry, gardening, pet care, and more.

## Features

- View available house chores services
- Book a service provider for a specific date
- Receive notifications upon booking

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB
- CORS
- Body-Parser

### Frontend

- React
- Axios
- React Router DOM

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/matthsworld/Houchser-alx_webstack_project.git
    cd Houchser-alx_webstack_project
    ```

2. Set up the backend:

    ```sh
    cd houchser-backend
    npm install
    ```

3. Set up the frontend:

    ```sh
    cd ../houchser-web
    npm install
    ```

### Running the Application

1. Start the MongoDB server:
    ```sh
    mongod
    ```

2. Start the backend server:
    ```sh
    cd houchser-backend
    node server.js
    ```

3. Start the React development server:
    ```sh
    cd ../houchser-web
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

### Backend (`houchser-backend`)

- `server.js`: Main server file, defines the Express app and routes.

### Frontend (`houchser-web`)

- `src/`: Contains all the React components and application logic.
- `src/components/Home.js`: Displays the list of available services.
- `src/components/Booking.js`: Allows users to book a service.

## Routes

### Backend Routes

- `GET /services`: Fetch all available services.
- `POST /book`: Book a service by providing service type, provider, date, and user ID.

## License

This project is licensed under the MIT License.

