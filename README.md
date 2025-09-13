# User Service API

A user authentication and management service built with **Python (FastAPI)**, **PostgreSQL**, **gRPC**, and **JWT**.  
This project demonstrates modern backend practices including REST APIs, secure authentication, and service-to-service communication.

![WIP](https://img.shields.io/badge/Work_in_Progress-ongoing-orange?logo=github&logoColor=white)

## Project Structure
```bash
user-service-api/
 ├─ app/
 │   ├─ main.py
 │   ├─ models.py
 │   ├─ db.py
 │   ├─ auth.py
 │   └─ routers/
 ├─ requirements.txt
 ├─ README.md
 ```


## Tech Stack
- **FastAPI** – Web framework for REST APIs
- **PostgreSQL** – Relational database
- **SQLAlchemy** – ORM for database interactions
- **JWT (JSON Web Tokens)** – Authentication and authorization
- **gRPC** – High-performance RPC framework
- **Docker** – Containerized Postgres for local development

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/user-service-api.git
cd user-service-api
```
### 2. Create Virtual Environment
```bash
python -m venv venv
# Activate venv

# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```
### 3. Install Dependencies
```bash 
pip install -r requirements.txt
```

### 4. Start PostgreSQL (Docker)
```bash
docker run --name user-postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=userdb \
  -p 5432:5432 -d postgres:15
```

### 5. Run the API
```bash
uvicorn app.main:app --reload
```

## ✅ Roadmap
- [x] Project initialization
- [ ] REST API endpoints for user registration & login
- [ ] JWT authentication & authorization
- [ ] gRPC interface for internal services
- [ ] CI/CD setup with GitHub Actions