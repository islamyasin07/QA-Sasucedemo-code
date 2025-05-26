# Playwright Testing Project

This is a simple testing project using **Playwright** and **TypeScript**.  
I tested the website [saucedemo.com](https://www.saucedemo.com) to check if it works well.

---

## What I Tested

-  Login correct and wrong password
-  Add to cart and remove item
-  Checkout fill form and confirm order
-  Sorting products by name and price

---

## How the Project is Organized

- `LoginPage.ts`, `ProductsPage.ts`, `CartPage.ts`, `CheckoutPage.ts`:  
  These files are for the pages (Page Object Model)

- `login.spec.ts`, `cart.spec.ts`, `checkout.spec.ts`, `sort.spec.ts`:  
  These are the test files for each part of the website
