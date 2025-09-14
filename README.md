# mock-store-payment-backend

A backend service for a mock store and payment system.  
It demonstrates common backend patterns such as authentication, product catalog, order management, and integration with a mock payment service.  
This project is intended as a backend showcase and learning exercise, not for production use.

![WIP](https://img.shields.io/badge/Work_in_Progress-ongoing-orange?logo=github&logoColor=white)

## Features
- User registration and login with JWT authentication
- Product catalog (browse available items)
- Order creation with snapshot pricing
- Integration with a mock payment service (no real money involved)
- Secure payment callback handling
- Order history per user

## Tech Stack
- Language: Python / Node.js (depending on implementation choice)
- Database: PostgreSQL
- API: REST (gRPC optional for internal service calls)
- Authentication: JWT
- Deployment: Docker

## Database Schema (MVP)
- **users**: id, username, password_hash, email, created_at  
- **products**: id, name, price, description, created_at  
- **orders**: id, user_id, product_id, amount, status, created_at, updated_at  

## Project Structure
```bash
mock-store-payment-backend/
├── src/
│ ├── api/ # REST endpoints
│ │ ├── auth/ # login, register
│ │ ├── products/ # product catalog
│ │ ├── orders/ # order creation, history
│ │ └── payment/ # mock payment + callbacks
│ ├── db/ # database models / schema
│ ├── core/ # config, JWT utils, middlewares
│ └── app.(py|js) # main entry point
├── tests/ # unit/integration tests
├── migrations/ # database migrations / init SQL
├── docker-compose.yml # Postgres + API service
├── Dockerfile # build backend service
├── requirements.txt # Python deps (if Python)
├── package.json # Node.js deps (if Node)
└── README.md
```
