# Jhama Sweets Storefront

This is a frontend e-commerce project I built for college, based on the look and feel of the Jhama Sweets website. My goal was to recreate the shopping experience while making the interface responsive and adding working interactions instead of building a static copy.

The project currently covers the complete frontend flow—from browsing products to signing in and placing a demo order. Real payments and permanent order storage are intentionally not included yet.

## Features

- Responsive home, category and product pages
- Separate collections for sweets, namkeen, dry fruits and chocolates
- Live product search
- Product weight options for 400g and 800g with updated pricing
- Shopping cart with editable weights and automatic totals
- Email and password authentication using Supabase
- Editable account profile
- Demo checkout with a five-second payment simulation
- Confirmed orders displayed in the account section
- Mobile-friendly navigation, cart and search
- Subtle page, drawer and interaction animations

## Built with

- React
- Vite
- Supabase Auth
- Lucide React
- Plain CSS

## A note about checkout

The payment screen is only a simulation and never charges real money. Demo orders are saved in the browser's local storage for each signed-in user, so they can appear in the account section without an orders backend.

## Disclaimer

This project was created for educational purposes. Jhama Sweets branding and product imagery belong to their respective owners. This repository is not an official Jhama Sweets product or commercial store.
