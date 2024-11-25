
# Project: Wave Equation Simulation

This project implements a wave equation simulation using a FastAPI backend and a React frontend (with Material-UI).

---

## **1. General Instructions for Running the Project**

### 1.1. Requirements
- Ensure the following are installed on your system:
  - Docker
  - Docker Compose

### 1.2. Running the Entire Project

1. Clone the repository:
   ```bash
   git clone <repository URL>
   cd <project folder>
   ```

2. Start the project using `docker-compose`:
   ```bash
   docker-compose up --build
   ```

3. Open in your browser:
   - Backend (API documentation): [http://localhost:8000/docs](http://localhost:8000/docs)
   - Frontend (web application): [http://localhost:3000](http://localhost:3000)

4. To stop the project:
   ```bash
   docker-compose down
   ```

---

## **2. Running Components Individually**

If you need to run only the backend or the frontend, follow these steps:

---

### **2.1. Backend (FastAPI)**

#### 2.1.1. Running Backend Locally (Without Docker)

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - For **Linux/Mac**:
     ```bash
     source .venv/bin/activate
     ```
   - For **Windows**:
     ```bash
     .\.venv\Scripts\activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

6. Open API documentation in your browser: [http://localhost:8000/docs](http://localhost:8000/docs)

#### 2.1.2. Running Backend in Docker

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Build the Docker image:
   ```bash
   docker build -t fastapi-backend .
   ```

3. Run the container:
   ```bash
   docker run -d -p 8000:8000 --name fastapi_backend fastapi-backend
   ```

4. Open API documentation in your browser: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### **2.2. Frontend (React)**

#### 2.2.1. Running Frontend Locally (Without Docker)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Ensure Node.js is installed. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

4. Open the web application in your browser: [http://localhost:3000](http://localhost:3000)

#### 2.2.2. Running Frontend in Docker

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Build the Docker image:
   ```bash
   docker build -t react-frontend .
   ```

3. Run the container:
   ```bash
   docker run -d -p 3000:3000 --name react_frontend react-frontend
   ```

4. Open the web application in your browser: [http://localhost:3000](http://localhost:3000)

---

## **3. Project Structure**

```
root
├── backend
│   ├── main.py              # Backend core code
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Dockerfile for backend
├── frontend
│   ├── src
│   │   ├── components       # React components
│   │   │   ├── ParameterForm.tsx
│   │   │   ├── GraphDisplay.tsx
│   │   │   ├── ResultsDisplay.tsx
│   │   ├── App.tsx          # Main application component
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # Dockerfile for frontend
├── docker-compose.yml        # File to run the project using Docker Compose
└── README.md                 # Documentation
```

---

## **4. Shutting Down**

If you started the project with Docker Compose, stop all containers with:
```bash
docker-compose down
```
If you started components individually with Docker, use:
```bash
docker stop <container_name>
docker rm <container_name>
```

---

## **5. Questions and Support**

For questions or issues, create an issue in the repository or contact the developer.
