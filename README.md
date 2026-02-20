# Petco Clone - Sanity Studio

This is a Sanity Studio project for the Petco clone, designed to manage products, categories, and brands with a strict hierarchical structure.

## Project Structure

This project uses a monorepo structure managed by **Turbo** and **pnpm**.

- `studio`: The Sanity Studio application.
- `packages/`: (Optional) Reusable components or configurations.

## Schema Architecture

The content model is designed to support deep nesting and data integrity for a complex e-commerce catalog.

### 1. Products (`product`)
Each product includes:
- **Title, Slug, Stock, Price, Images.**
- **Reviews:** Average rating, total count, and an array of detailed user reviews.
- **Hierarchical Categorization:** References to Category, Sub-category, and Child category with **dependent filters** (e.g., you can only select sub-categories belonging to the chosen parent category).
- **Specifications:** Includes SKU, **Brand (Reference)**, and shipping details.
- **Variant Details:** For managing different sizes/weights.
- **Rich Content:** Descriptions and "More Information" sections using Sanity's Portable Text.
- **Utility Fields:** Warranty, Directions, Warnings, Ingredients, and Guaranteed Analysis.

### 2. Taxonomy & Brands
- **Category:** Top-level (e.g., Dog, Cat).
- **Sub-Category:** Second-level, linked to a Parent Category.
- **Child Category:** Third-level, linked to a Sub-Category (enables URLs like `/category/fish/live-plants/co2-accessories`).
- **Brand:** Centrally managed brands with logos and names, referenced in products.

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
pnpm --filter petco-clone dev
```
(Note: The filter name `petco-clone` matches the package name in `studio/package.json`).

The studio will be available at `http://localhost:3333`.

## Commands
- `pnpm build`: Build the project.
- `pnpm --filter petco-clone deploy`: Deploy the Sanity Studio to the cloud.
- `pnpm --filter petco-clone typecheck`: Run TypeScript validation.

## Tech Stack
- **Sanity v3**
- **React 19**
- **TypeScript**
- **Turbo**
- **pnpm**
