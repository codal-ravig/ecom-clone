# Petco Clone: Full Schema Specification

This document provides a detailed breakdown of every Sanity document type, its fields, data types, and inter-document relationships.

---

## 1. Core Commerce

### 1.1 Product (`product`)
The central document for all items sold in-store and online.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Product title. | - |
| `slug` | `slug` | URL path based on name. | - |
| `category` | `reference` | Primary top-level category. | → `category` |
| `subCategory` | `reference` | Second-level category. | → `category` |
| `childCategory` | `reference` | Third-level category. | → `category` |
| `brand` | `reference` | Brand of the product. | → `brand` |
| `petType` | `string` | Dog, Cat, Fish, etc. | - |
| `lifeStage` | `string` | Puppy, Adult, Senior, etc. | - |
| `healthConsiderations`| `array[string]` | Tags for health traits. | - |
| `badges` | `array[string]` | Promo badges (Sale, New). | - |
| `price` | `number` | Base price. | - |
| `discountPercentage`| `number` | Base discount. | - |
| `stock` | `number` | Total inventory. | - |
| `images` | `array[image]` | Product gallery. | - |
| `options` | `array[object]` | Defined dimensions (Color/Size).| → `productOption` |
| `variants` | `array[object]` | SKUs combining options. | → `productVariant` |
| `specifications` | `object` | Dimensions and specs. | → `productSpecification`|
| `additionalFeatures`| `array[object]` | Extra feature bullets. | → `productFeature` |
| `review` | `array[reference]` | Customer feedback. | → `review` |
| `productQNA` | `array[reference]` | Questions & Answers. | → `productQNA` |
| `requiresPrescription` | `boolean` | Pharmacy flag. | - |
| `dosageForm` | `string` | Tablet, chewable, etc. | - |
| `deliveryMethods` | `array[object]` | Fulfillment options & badges.| - |
| `repeatDeliveryDiscount`|`number`| Ongoing % discount. | - |

### 1.2 Category (`category`)
Hierarchical classification system.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Category name. | - |
| `slug` | `slug` | URL identifier. | - |
| `petType` | `string` | Optional pet-specific filter. | - |
| `parent` | `reference` | Link to a parent category. | → `category` |
| `featuredProducts` | `array[reference]`| Hand-picked items. | → `product` |
| `trendingProducts` | `object` | Trending promo section. | → `categoryPromotion`|
| `bestSellers` | `object` | Best sellers section. | → `categoryPromotion`|
| `mostViewed` | `object` | Most viewed section. | → `categoryPromotion`|
| `alsoBought` | `object` | Customers also bought section.| → `categoryPromotion`|

### 1.3 Brand (`brand`)
Manufacturer information.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Brand name. | - |
| `image` | `image` | Brand logo. | - |
| `petTypes` | `array[string]` | Pets supported by this brand. | - |

### 1.4 Product Auxiliary Structures
Supporting schemas that power complex product details.

**Product Option (`productOption`)**
Values that can be combined to form a SKU representation (e.g. Name: "Size", Values: ["S", "M", "L"]).

**Product Variant (`productVariant`)**
The actual purchasable SKU, built from a combination of Options.
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `combination` | `string` | Auto-generated combo name. |
| `price` | `number` | Specific price for variant. |
| `compareAtPrice`| `number` | Sale / original price. |
| `stock` | `number` | Specific inventory for variant. |
| `images` | `array[image]` | Variant specific media. |

**Product Specification (`productSpecification`)**
Groups all technical specifications of a product.
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `sku` / `brand` | `string`/`ref` | Technical identifiers. |
| `daysToShip` | `number` | Expected time to fulfilling. |
| `lifestage` | `string` | E.g., Puppy, Adult, Senior. |
| `weight`/`dims` | `string`/`num`| Physics-related measurements. |

---

## 2. Customer Interaction (Moderation)

### 2.1 Customer Review (`review`)
Standalone document for moderation.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `product` | `reference` | The item being reviewed. | → `product` |
| `rating` | `number` | Star rating (1-5). | - |
| `title` | `string` | Review headline. | - |
| `description` | `text` | Detailed feedback. | - |

### 2.2 Customer Q&A (`productQNA`)
Engagement between users and the community/experts.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `product` | `reference` | Item the question is about. | → `product` |
| `question` | `text` | User's question. | - |
| `answers` | `array[object]` | Nested responses. | - |

---

## 3. Physical Experience (O2O)

### 3.1 Store Location (`store`)
Physical retail data.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Store identifier. | - |
| `address` | `text` | Full physical address. | - |
| `location` | `geopoint` | Map coordinates. | - |
| `isPharmacy` | `boolean` | If store has a pharmacy. | - |
| `servicesAvailable`| `array[reference]` | Offered services. | → `service` |

### 3.2 Pet Service (`service`)
Specialized offerings (Grooming, Vet).
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Service name. | - |
| `benefits` | `array[string]` | Key selling points. | - |
| `serviceUrl` | `url` | External booking link. | - |

---

## 4. Users & Personalization

### 4.1 User (`user`)
User account profiles.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Full name. | - |
| `profile` | `image` | User avatar. | - |
| `pets` | `array[reference]` | User's registered pets. | → `petProfile` |

### 4.2 Pet Profile (`petProfile`)
Individual pet data.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `owner` | `reference` | User who owns the pet. | → `user` |
| `name` | `string` | Pet name. | - |
| `petType` | `string` | Dog, Cat, etc. | - |
| `breed` | `reference` | Pet's breed. | → `breed` |

---

## 5. Site Engine (Settings & Layout)

### 5.1 Main Navigation (`navigation`)
Multi-level menu structure.
| Field Name | Type | Description | Relations |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Menu name. | - |
| `items` | `array[object]` | Nested link structure. | - |
| `items.featured` | `object` | Promo image within menu. | - |

### 5.2 Page Builder (`page`)
Modular landing page system.
| Section Name | Type | Description | Key References |
| :--- | :--- | :--- | :--- |
| `heroSection` | `object` | Large header with CTA. | - |
| `productListSection`| `object` | Dynamic item display. | → `product` |
| `membershipSection` | `object` | Vital Care promo. | → `membership` |
| `serviceGridSection`| `object` | Services highlight. | → `service` |

---

## 6. Relationship Summary (Cheat Sheet)
*   **A Product** can have many **Reviews** and **Questions**.
*   **A User** can have many **Pet Profiles**.
*   **A Store** offers many **Services**.
*   **A Pet Profile** is linked to one **Breed**.
*   **An Article** can reference many **Products** (upsell).
*   **A Category** can contain many **Products** and have one **Parent Category**.
