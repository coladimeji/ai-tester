ai-tester/
├── client/                          # Frontend React Application
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── common/            # Shared components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── auth/             # Authentication components
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── dashboard/        # Dashboard components
│   │   │   │   ├── TestStats.jsx
│   │   │   │   └── ResultsTable.jsx
│   │   │   └── testing/          # Testing-specific components
│   │   │       ├── TestEditor.jsx
│   │   │       ├── TestRunner.jsx
│   │   │       └── ResultViewer.jsx
│   │   ├── contexts/             # React contexts
│   │   │   ├── AuthContext.js
│   │   │   └── TestContext.js
│   │   ├── hooks/               # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   └── useTest.js
│   │   ├── services/            # API services
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   └── test.service.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   ├── styles/              # CSS/SCSS files
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── README.md

├── server/                      # Backend Application
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.js
│   │   │   └── environment.js
│   │   ├── controllers/        # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── test.controller.js
│   │   │   └── results.controller.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/            # Database models
│   │   │   ├── user.model.js
│   │   │   ├── test.model.js
│   │   │   └── result.model.js
│   │   ├── routes/            # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── test.routes.js
│   │   │   └── results.routes.js
│   │   ├── services/          # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── test.service.js
│   │   │   └── ai.service.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── logger.js
│   │   │   └── validators.js
│   │   └── app.js            # Main application file
│   ├── tests/                # Test files
│   │   ├── unit/
│   │   └── integration/
│   ├── package.json
│   └── README.md

├── docker/                   # Docker configuration
│   ├── frontend.dockerfile
│   ├── backend.dockerfile
│   └── docker-compose.yml

├── test-environments/       # Test execution environments
│   ├── python/
│   │   └── Dockerfile
│   ├── javascript/
│   │   └── Dockerfile
│   ├── java/
│   │   └── Dockerfile
│   └── README.md

├── docs/                    # Documentation
│   ├── api/
│   ├── setup/
│   └── usage/

├── scripts/                 # Utility scripts
│   ├── setup.sh
│   └── deploy.sh

├── .gitignore
├── README.md
└── package.json



# Create project directories
mkdir ai-tester
cd ai-tester
mkdir client server

# Initialize client (React frontend)
cd client
npx create-react-app .

# Install frontend dependencies
npm install @material-ui/core @material-ui/icons
npm install @emotion/react @emotion/styled
npm install axios
npm install react-router-dom
npm install firebase
npm install tailwindcss postcss autoprefixer
npm install @reduxjs/toolkit react-redux
npm install socket.io-client
npm install react-syntax-highlighter
npm install react-toastify
npm install jwt-decode

# Initialize Tailwind CSS
npx tailwindcss init -p

# Go back to root and setup server
cd ../server
npm init -y

# Install backend dependencies
npm install express
npm install cors
npm install dotenv
npm install mongoose
npm install jsonwebtoken
npm install bcryptjs
npm install winston
npm install express-validator
npm install multer
npm install socket.io
npm install openai
npm install docker-compose
npm install nodemon --save-dev