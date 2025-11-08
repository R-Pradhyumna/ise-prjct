# Innovata - Student Project Showcase

This project is a web application designed to showcase student projects for an event called "Innovata". It dynamically loads project data from a public Google Sheet and displays it in an interactive and user-friendly interface.
Website link: https://innovata-ise.netlify.app/

## Features

- **Dynamic Project Loading:** Project information is fetched directly from a Google Sheet, making it easy to update content without changing the code.
- **Project Filtering:** Users can filter projects by academic scheme.
- **Search Functionality:** Users can search for projects by team number or project title.
- **Resource Linking:** Each project can have links to various resources such as papers, presentations, pictures, and videos.
- **Responsive Design:** The application is designed to work on various screen sizes.

## Technologies Used

- **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/):** A fast build tool and development server for modern web projects.
- **[React Router](https://reactrouter.com/):** For handling routing within the application.
- **[Papaparse](https://www.papaparse.com/):** A powerful CSV parser used to process data from Google Sheets.
- **[React Icons](https://react-icons.github.io/react-icons/):** For including popular icons in the project.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or a similar package manager) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/innovata.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd innovata
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

The project requires a Google Sheet URL to fetch the project data.

1.  Create a `.env` file in the root of the project.
2.  Add the following line to the `.env` file, replacing the URL with your own public Google Sheet CSV URL:
    ```
    VITE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/your-sheet-id/pub?output=csv
    ```
    **Note:** Ensure your Google Sheet is published to the web as a CSV file.

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server, and you can view the application at `http://localhost:5173` (the port may vary).

## Build and Deployment

### Building for Production

To create a production build of the application, run the following command:

```sh
npm run build
```

This will generate a `dist` folder containing the optimized and minified static assets for your application.

### Deployment

The contents of the `dist` folder can be deployed to any static site hosting service, such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

Simply upload the contents of the `dist` folder to your hosting provider of choice.
