🌟 Lokalooks E-commerce  

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5">
    <img src="https://img.shields.io/badge/HTML5-orange?logo=html5&logoColor=white" alt="Made with HTML5">
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
    <img src="https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white" alt="Made with CSS3">
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src="https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black" alt="Made with JavaScript">
  </a>
  <a href="https://www.json.org/">
    <img src="https://img.shields.io/badge/JSON-lightgrey?logo=json&logoColor=black" alt="JSON Data">
  </a>
  <a href="#-design--responsiveness">
    <img src="https://img.shields.io/badge/Responsive-Yes-success" alt="Responsive">
  </a>
  <a href="https://fertan15.github.io/Lokalooks_E-commerce/Home.html">
    <img src="https://img.shields.io/badge/Deployed-GitHub%20Pages-black?logo=github" alt="Deployed on GitHub Pages">
  </a>
</p>

A **modern static online store** designed to simulate a real e-commerce shopping experience.  
This project was created to demonstrate **front-end web development fundamentals** while building a clean, interactive, and responsive website.  

🔗 **Live Demo** → [Explore Lokalooks E-commerce](https://fertan15.github.io/Lokalooks_E-commerce/Home.html)  

---

## 📸 Screenshots / Preview  

Here’s a quick look at **Lokalooks E-commerce** in action:  

### 🏠 Home Page  
<img width="1904" height="1019" alt="HomePage_Screenshots" src="https://github.com/user-attachments/assets/a5344e7f-6c2c-4130-8941-c15399b65da1" />

### 🛍️ Shop Page  
<img width="1892" height="1013" alt="ShopPage_Screenshots" src="https://github.com/user-attachments/assets/975c94bb-044a-4cdf-be6f-a16ef6907039" />

### 📦 Product Detail Page  
<img width="1881" height="916" alt="Pdetail_Screenshots" src="https://github.com/user-attachments/assets/797d48a7-b93c-40aa-9273-9901b6b9bafd" />

### 🛒 Cart Page  
<img width="1886" height="898" alt="Cart_Screenshots" src="https://github.com/user-attachments/assets/27d618e7-2360-4fdc-8dbe-ded282686ef5" />

### 🎮 Game Page  
<img width="1885" height="886" alt="Game_Screenshots" src="https://github.com/user-attachments/assets/22e51d99-abf0-4d1c-8ee2-7726010a5cc1" />

---

## 🏷️ Overview  

Lokalooks E-commerce is a **multi-page shopping website** that showcases how HTML, CSS, JavaScript, and JSON can be combined to create a functional, engaging, and visually appealing online store.  

Although the site is **fully static** (no backend), it simulates real-world e-commerce features:  
- Browsing products by category  
- Viewing detailed product pages  
- Managing a shopping cart  
- Engaging users with a mini-game for fun  

It is hosted on **GitHub Pages**, making it instantly accessible to anyone with a browser — no setup required.  

---

## 🛠️ Technologies  

- **HTML5** → Semantic structure and accessibility  
- **CSS3** → Layouts, styling, responsive design, and animations  
- **JavaScript (ES6)** → Dynamic behavior, cart logic, interactivity  
- **JSON API** – Product data served from a static JSON file hosted online via GitHub Pages.
---

## 📂 Project Structure  

Lokalooks_Ecommerce/ <br>
│<br>
├── Home.html # Landing page<br>
├── Home.css # Home page styles<br>
├── about.html # About page<br>
├── about.css # About page styles<br>
├── cart.html # Shopping cart page<br>
├── cart.js # Cart functionality (add/remove/update items)<br>
├── detail.html # Individual product detail page<br>
├── detail.css # Styles for product detail page<br>
├── game.html # Mini-game page<br>
├── game.js # Game logic and interactions<br>
├── game.css # Styles for the game page<br>
├── shop.html # Product listing page<br>
├── shop.css # Styles for shop/product grid<br>
├── products.json # Product data (name, price, description, images) <br>
└── img/ # Images for products and branding<br>


---

## 🧭 User Flow  

### 🏠 Home Page  
- Welcoming banner with brand identity  
- Featured products highlighted  
- Quick navigation to **Shop**, **Cart**, **Game**, and **About**  

### 🛍️ Shop Page  
- Product grid loaded dynamically from `products.json`  
- Each product card displays **image, name, price**, and a link to details  

### 📦 Product Detail Page  
- Larger image, description, and pricing information  
- **Add to Cart** button to include items in shopping cart  

### 🛒 Cart Page  
- Displays selected products, quantities, and total price  
- Users can **increase, decrease, or remove** items  
- Cart logic fully managed with JavaScript (with optional persistence via `localStorage`)  

### 🕹️ Game Page Details  

To make the shopping experience more engaging, the site includes a **Rock–Paper–Scissors** mini-game 🎮.  

- Users can play against the computer by choosing **Rock**, **Paper**, or **Scissors**.  
- The computer generates a random choice each round.  
- Results (Win / Lose / Draw) are displayed instantly.  
- The game is styled with `game.css` for a clean, interactive feel.  
- All logic is handled in `game.js` with simple JavaScript functions.  

This page demonstrates how **JavaScript can be used to add interactivity and fun** to a static website.  

### ℹ️ About Page  
- Project background and **educational purpose**  
- Credits to creators/developers  

---

## 🗂️ Data Management  

**Product Data**  
- Hosted online at: [https://fertan15.github.io/fileapi_product/products.json](https://fertan15.github.io/fileapi_product/products.json)  
- Acts as a **simple API endpoint**  
- Contains product name, price, description, and image URL  

**Cart Data**  
- Managed in-browser with JavaScript  
- Auto-updates when adding/removing products  
- Can persist with `localStorage`  

---

## 🎨 Design & Responsiveness  

- Designed with **clean, modern CSS** for a professional look  
- Fully **responsive layouts** that adapt to desktops, tablets, and smartphones  
- Consistent branding, typography, and spacing for improved readability and UX  
- Visual hierarchy ensures **easy navigation** and **user-friendly shopping flow**  

---

## 🕹️ Game Page Details  

To make the shopping experience more engaging, the site includes a **Rock–Paper–Scissors** mini-game 🎮.  

- Users can play against the computer by choosing **Rock**, **Paper**, or **Scissors**.  
- The computer generates a random choice each round.  
- Results (Win / Lose / Draw) are displayed instantly.  
- The game is styled with `game.css` for a clean, interactive feel.  
- All logic is handled in `game.js` with simple JavaScript functions.  

This page demonstrates how **JavaScript can be used to add interactivity and fun** to a static website.  

---

## 🚀 Deployment  

- Hosted on **GitHub Pages** for free static hosting  
- No backend or installation required — just open the [live demo link](https://fertan15.github.io/Lokalooks_Ecommerce/Home.html)  

---

## 🎓 Educational Value  

This project was developed as part of a **Front-End Web Design course** (Semester 1).  

gain practical experience with:  
- **Multi-Page Website Architecture** (separating HTML files)  
- **Separation of Concerns** (HTML = structure, CSS = styling, JS = behavior)  
- **Dynamic Data Loading** (JSON integration)  
- **Interactive Features** (shopping cart + game page)  
- **Responsive Web Design** principles  
- **Static Deployment** with GitHub Pages  

---

## 💡 Future Improvements  

- Add **user authentication** (login/registration)  
- Implement a **checkout flow** with payment integration  
- Enhance the **Game Page** with more levels and mechanics  
- Add **product categories, filters, and search** functionality  
- Allow **user reviews and ratings**  
- Improve **accessibility** (keyboard navigation, ARIA labels, etc.)  

---

## 👥 Credits  

📌 Created for the **Front-End Web Design Course Project (1st Semester)**  
👨‍💻 Developed by **Ferlinda Tanwio**  
🖼️ **Image Disclaimer:**  
> The product images and branding used in this project are sourced from existing brand stores.  
> They are included **for educational and demonstration purposes only**.  
> This project is an exercise and is **not affiliated with, endorsed by, or intended for commercial use** by any of the brands featured.  

---

✨ No installation needed! Just visit the [Live Demo](https://fertan15.github.io/Lokalooks_E-commerce/Home.html) and start exploring.  
