# Petco Clone - Sanity Studio

This is a Sanity Studio project for the Petco clone, designed to manage products, categories, articles, pages, and site-wide configurations with a modular and hierarchical structure.

## Project Structure

This project uses a monorepo structure managed by **pnpm**.

- `studio`: The Sanity Studio application (package name: `petco-clone`).
- `packages/`: Reusable components or configurations.
- `migrations/`: Sanity CLI scripts for data transformations (e.g., importing users, fixing keys).
- `queries/`: GROQ queries for fetching data in frontend applications.

## Schema Architecture

The content model is designed to support deep nesting, data integrity, and a dynamic page builder for a complex e-commerce catalog.

### 1. Products & Taxonomy
- **Products (`product`):** Detailed schema including Title, Slug, Stock, Price, Images, **Reviews (with ratings and text)**, **Specifications**, **Features**, **Variants**, and **Q&A**.
- **Taxonomy:** Hierarchical categorization with **Category** (Top-level), **Sub-Category**, and **Child Category** (Linked references with dependent filtering).
- **Brands:** Centrally managed brands with logos, referenced across products.

### 2. Pages & Articles
- **Pages (`page`):** Dynamic page builder using a variety of sections:
  - **Hero Section:** Large visual introduction.
  - **Grid Section:** Flexible layouts for content blocks.
  - **FAQ Section:** Frequently asked questions.
  - **Featured Products/Articles:** Showcasing specific items.
  - **Info/Text Sections:** Standard content blocks.
- **Articles (`article`):** Blog posts or informational content, categorized by **Article Categories**.

### 3. Settings & Users
- **Global Settings:** Centralized configuration for **Header** and **Footer** navigation and branding.
- **Users (`user`):** Schema for managing user profiles, likely for review attribution and future personalization.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/)

### Installation
From the root directory, run:
```bash
pnpm install
```

### Development
To start the Sanity Studio locally:
```bash
pnpm dev
```
(This runs `sanity dev` within the `studio` workspace).

The studio will be available at `http://localhost:3333`.

## Commands
- `pnpm build`: Build all workspaces.
- `pnpm lint`: Run linting across the monorepo.
- `pnpm --filter petco-clone deploy`: Deploy the Sanity Studio to the cloud.
- `pnpm --filter petco-clone typegen`: Generate TypeScript types from schemas.

## Tech Stack
- **Sanity v3** (Content Platform)
- **React 19** (UI Library)
- **TypeScript** (Language)
- **pnpm** (Package Management)
- **GROQ** (Query Language)
