📘 MerrBio – MVP for Hackathon 2025

💡 Project Description

MerrBio is a web platform built during Hackathon 2025, aiming to directly connect local farmers with consumers who are seeking fresh, local, and organic produce. During this 2-day event, our team developed a functional Minimum Viable Product (MVP) that allows farmers to register, manage their agricultural products, and for consumers to browse and make purchase requests.

🎯 Our Goal

Our main objective was to build a simple but functional web application that includes:

Registration/Login for farmers and consumers.
Dedicated dashboard for each role to manage their actions.
A public product listing with simple filtering.
Ability for consumers to send product requests and for farmers to view/manage them.
A clean, responsive, and user-friendly interface.
🧑‍💻 Technologies Used

Backend:

Node.js
Express.js
express-state: for passing data from server to client efficiently.
MongoDB: for storing data flexibly, including users, products, and requests.
Frontend:

HTML, CSS, JavaScript (Vanilla)
Bootstrap: for a responsive and mobile-friendly design
DOM manipulation for dynamic frontend-backend interaction
🛠️ Core Functionality

Registration and Login for two roles: Farmer and Consumer.
Farmer Dashboard:
Add / Delete / Edit products
View product requests from consumers
Consumer Dashboard:
Browse available products
Filter/search products
Request a product directly from the farmer
Superadmin Role (optional bonus): can manage users and products across all accounts.
Simple, responsive, and clean UI for optimal user experience.
🧪 How to Run Locally

Clone the repository:
git clone https://github.com/sakenox/hackathon_biomarket.git

Navigate to the project directory:
cd merrbio

Install dependencies:
npm install

Create a .env file with MongoDB connection parameters (or modify them directly inside the backend code if .env is not used)

Start the server:

node server.js

Open the app in your browser:
http://localhost:3000

🗂️ Project Structure

/models – MongoDB schemas for users, products, and requests
/routes – Route files for auth, API, dashboards
/public – Static files including HTML/CSS/JS and Bootstrap
/views – Dynamic views (if templating is used, in coordination with express-state)
/controllers – Logic for handling specific routes
server.js – Main entry point for the Node/Express server
📈 Implemented Bonus Features

Language switch between Albanian and English (optional)
Basic messaging system between buyer and farmer (in testing)
Superadmin dashboard for managing all users/products (partially functional in MVP)
📆 Development Timeline

All development took place over two intense days during the Hackathon:

Saturday, April 12 – Planning, role assignment, backend setup, and initial endpoints
Sunday, April 13 – Final UI build, frontend-backend integration, testing, and live demo prep
🎥 Demo & Presentation

The app is capable of demonstrating end-to-end interaction between farmers and consumers in a simplified manner. During presentation, our team showcased:

Full functionality from both user roles
Clear team role distribution
Technologies used in the stack
Live demo and walkthrough of user flows

📌 Lessons Learned

Time management is crucial — focusing on core features makes MVP achievable
Communication between team members keeps backend and frontend aligned
Clear project file structure speeds up development
Using familiar technologies like Express and Bootstrap saves valuable time
🤝 Thanks & Acknowledgments

Special thanks to the Merrbio Hackathon organizers for giving us the chance to tackle a real-world challenge with a meaningful social impact.

