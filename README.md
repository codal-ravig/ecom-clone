# Petco Clone - Sanity Studio

This is a Sanity Studio project for the Petco clone, designed to manage products, categories, articles, pages, and site-wide configurations with a modular and hierarchical structure.

## Project Structure

This project uses a monorepo structure managed by **pnpm**.

- `studio`: The core Sanity Studio application (package name: `petco-clone`).
  - `schemaTypes/`: Definition of content models (schemas).
  - `migrations/`: Sanity CLI scripts for data transformations (e.g., importing users, fixing keys).
  - `queries/`: GROQ queries for fetching data in frontend applications.
- `packages/`: Workspace for shared components or configurations (currently reserved for future use).

## Configuration

- **Project ID:** `i9lae4hh`
- **Dataset:** `production`

## Schema Architecture

The content model is designed to support deep nesting, data integrity, and a dynamic page builder for a complex e-commerce catalog.

### 1. Products & Taxonomy
- **Products (`product`):** Detailed schema including Title, Slug, Stock, Price, Images, **Reviews**, **Specifications**, **Features**, **Variants**, and **Q&A**.
- **Taxonomy:** Hierarchical categorization with **Category**, **Sub-Category**, and **Child Category**. Categories support a **Page Builder** to create dynamic landing pages.
- **Brands:** Centrally managed brands with logos, referenced across products.
- **Collections:** Curated groups of products.

### 2. Pages & Articles
- **Pages (`page`):** Dynamic page builder using a variety of sections:
  - **Hero Section:** Large visual introduction.
  - **Grid Section:** Flexible layouts for content blocks.
  - **FAQ Section:** Frequently asked questions.
  - **Featured Articles:** Showcasing specific content.
  - **Contact Hero Section:** Specialized hero for contact pages.
  - **Info/Text Sections:** Standard content blocks.
- **Articles (`article`):** Blog posts or informational content, categorized by **Article Categories**.

### 3. Settings & Users
- **Global Settings:** Centralized configuration for **Header** and **Footer** navigation and branding.
- **Users (`user`):** Schema for managing user profiles.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/)

### Installation
From the root directory, install dependencies for all workspaces:
```bash
pnpm install
```

### Development
To start the Sanity Studio locally from the root:
```bash
pnpm dev
```
Alternatively, you can navigate to the `studio` directory and run:
```bash
cd studio
pnpm dev
```

The studio will be available at `http://localhost:3333`.

## Commands

Run these commands from the root directory to execute across all workspaces, or within `studio/` for targeted execution.

- `pnpm build`: Build all workspaces (Studio).
- `pnpm lint`: Run linting across the monorepo.
- `pnpm test`: Run tests (if configured).

### Studio-Specific Commands
(Run inside `studio/`)

- `sanity dev`: Start the development server.
- `sanity deploy`: Deploy the Studio to the Sanity cloud.
- `sanity schema extract`: Extract schema to `schema.json`.
- `sanity typegen generate`: Generate TypeScript types from schemas.
- `pnpm typegen`: localized script to run extract & generate.

## Tech Stack
- **Sanity Studio v3** (Content Platform)
- **React 19** (UI Library)
- **TypeScript** (Language)
- **pnpm** (Package Management)
- **GROQ** (Query Language)
