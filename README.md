# mock-store-payment-backend

![WIP](https://img.shields.io/badge/Work_in_Progress-On_Going-orange?logo=github&logoColor=white)
![WIP](https://img.shields.io/badge/PlaceHolder-CI/CD_Status-blue?logo=github&logoColor=white)

A learning-oriented backend service inspired by game store platforms.
It explores common backend patterns including authentication, product catalog, cart and order management, and integration with a mock payment service.

This project serves as a showcase and practice ground for backend development concepts, not intended for production use.

Frontend is not within the scope of this project.

## ✨ Features

| Feature | Scope |
|--|--|
| User Management | <ul><li>Create a new account</li><li>Log in</li><li>Delete own account</li></ul> |
| Product Query | <ul><li>Query individual products via API endpoint</li><li>Retrieve product prices</li></ul> |
| Shopping Cart | <ul><li>View cart contents</li><li>Add items to the cart</li><li>Delete items in the card</li></ul> |
| Checkout & Payment | <ul><li>Checkout selected items from the cart</li><li>Process payment through a mock payment API</li></ul> |
| Transactions & Invoices | <ul><li>Record user payments</li><li>Generate invoices (e.g., as PDF)</li></ul> |

## pending-demo
![WIP](https://img.shields.io/badge/PlaceHolder-Demo-blue?logo=github&logoColor=white)

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

> Disclaimer: `Node.js` was chosen over `C++` as it is more commonly used for backend services in Singapore. The project serves to align with prevalent industry practices and to build familiarity with widely adopted backend methodologies.

## Database ERD

```mermaid
erDiagram

    account {
        int id PK
        string handle_name
        string display_name
        string password_hash
        string email
        timestamp created_at
    }

    product {
        int id PK
        string name
        string description
        string category
        timestamp created_at
    }

    product_price_version {
        int id PK
        int product_id FK
        int version
        decimal price
        timestamp created_at
    }

    bundle {
        int id PK
        string name
        string description
        timestamp created_at
    }

    bundle_item {
        int bundle_id FK
        int product_id FK
    }

    bundle_price_version {
        int id PK
        int bundle_id FK
        int version
        decimal price
        timestamp created_at
    }

    cart {
        int id PK
        int account_id FK
        boolean is_bundle
        int product_id FK
        int product_version
        int bundle_id FK
        int bundle_version
        int quantity
        decimal price_snapshot
        uuid group_id
        timestamp created_at
        timestamp updated_at
    }

    purchase {
        int id PK
        int account_id FK
        boolean is_bundle
        int product_id FK
        int product_version
        int bundle_id FK
        int bundle_version
        decimal amount
        string purchase_status
        timestamp created_at
        timestamp updated_at
    }

    %% Relationships
    account ||--o{ cart : "has"
    account ||--o{ purchase : "makes"
    product ||--o{ product_price_version : "has versions"
    bundle ||--o{ bundle_item : "contains"
    product ||--o{ bundle_item : "part of"
    bundle ||--o{ bundle_price_version : "has versions"
    product ||--o{ cart : "in"
    bundle ||--o{ cart : "in"
    product ||--o{ purchase : "in"
    bundle ||--o{ purchase : "in"
```