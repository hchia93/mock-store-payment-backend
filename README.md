# mock-store-payment-backend

A backend service for a mock store and payment system.  
It demonstrates common backend patterns such as authentication, product catalog, order management, and integration with a mock payment service.  

This project is intended as a backend showcase and learning exercise, not for production use.

![WIP](https://img.shields.io/badge/Work_in_Progress-ongoing-orange?logo=github&logoColor=white)

## Purpose

**Learning goal**: Explore backend endpoint development with Node.js + Express, and practice connecting APIs to a database through an ORM.

**Business simulation**: Mimic the data flow of an e-commerce platform or in-game store (account, product, bundle, purchase, payment, price versioning, etc).

**Common challenges**: Handle typical backend concerns such as account management, schema evolution, data initialization/reset, and pricing logic.

## Feature Scope

1. User Management
    - Create a new account
    - Log in
    - Delete own account
2. Product Query
    - Query individual products via API endpoint
    - Retrieve product prices
3. Shopping Cart
    - View cart contents
    - Add items to the cart
    - Delete items in the card
4. Checkout & Payment
    - Checkout selected items from the cart
    - Process payment through a mock payment API
5. Transactions & Invoices
    - Record user payments
    - Generate invoices (e.g., as PDF)

Do take note that this project focus on endpoint API, not frontend capabilities.

## Tech Stack

- Database: `PostgreSQL`
- ORM: `Prisma`
- API Framework: `Node.js` + `Express`
- Configuration: `dotenv`, `pgpass`
- Automation: Windows batch scripts for database reset/init/load

```mermaid
flowchart LR 
    subgraph DB[PostgreSQL Database]
        TBL1[(Tables & Schema)]
        DATA[(Data Rows)]
    end

    subgraph Prisma[Prisma ORM Layer]
        SCHEMA[prisma/schema.prisma]
        MIGR[SQL Migrations]
        CLIENT[Generated Prisma Client]
    end

    subgraph API[Node.js API Layer]
        CODE[src/api/index.js]
    end

    %% Database to Prisma
    TBL1 -- db pull --> SCHEMA
    SCHEMA -- generate --> CLIENT
    MIGR -- apply --> TBL1

    %% API layer usage
    CODE -- import & query --> CLIENT
    CLIENT -- run SQL --> DB
```

## Project Structure

```bash
mock-store-payment-backend/
├── prisma/                 # Prisma schema & migrations
├── scripts/                # Windows batch scripts (reset-db, reset-data, etc.)
├── src/
│   └── api/                # Express API endpoints
├── .env                    # Example environment variables. Disensitized version config is pushed in this repo.
├── .pgpass                 # Local PostgreSQL password config
├── package.json
└── README.md
```
