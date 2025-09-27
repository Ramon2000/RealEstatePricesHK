# Product Requirements Document
## RealEstatePricesHK
---

## Purpose

The website allows users to manually enter flyer property listing details (Property Name, Bedrooms, Size, Price). The system then:
- Calculates Price per Square Foot.
- Fetches and displays the most recent comparable transactions (sourced from Spacious.hk, CentaNet, or other APIs/manual uploads).
- Compares the flyer price vs. past transactions (highlighting % difference).
- Goal: give users a realistic view of whether brochure pricing is inflated compared to actual sales.

## Core Features
### Input fields:
- Property Name (text)
- Bedrooms (numeric or dropdown)
- Size (sq.ft., numeric)
- Price (HKD, numeric)

### Recent Transactions (Comparable Data)
For each flyer entry, display last 3 transactions:
- Bedrooms
- Size (sq.ft.)
- Price (HKD)
- Price per sq.ft. (auto-calculated)
- Sales Date
- Source (clickable link)
    - https://hk.centanet.com/findproperty/
    - https://www.midland.com.hk/en
    - https://www.spacious.hk/en/hong-kong

### Comparison & Insights
- Auto-calculate % difference between flyer Price/sq.ft. and most recent transaction Price/sq.ft.

Display it clearly (e.g., “+18% above last sale”).

## User Flow
User lands on the site.
User clicks “Add Flyer Listing”.
User fills out property details.
System calculates Price/sq.ft.
System displays a comparison table:
Flyer listing (top row).
3 past transactions (below).
% over/under valuation (rightmost column).

## Data Sources
- Manual entry for flyer listings.
- Transactions data fetched via:
- Scraper

## Technical Requirements
### Frontend:
Next.js Server Side Rendered (simple table-based UI).
Input form for flyer listing.

### Backend:
All static pages
Scraper that run when the user submits data and will return the latest values.

## Success Metrics
MVP: Users can input a flyer listing and instantly see how its pricing compares to the last 3 real transactions.