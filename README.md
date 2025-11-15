# 💹 Zerodha Stock Trading Platform (MERN)

A full-stack stock trading web app inspired by Zerodha.  
Users can view live stock prices, buy/sell stocks, and track holdings with charts.

🔗 **Live Demo:** https://zerodha-os.netlify.app/  
🔗 **Backend:** Render  
🔗 **Frontend + Dashboard:** Netlify  

---

## 🚀 Features
- JWT-based **authentication** (signup/login)
- **Live stock data** using Twelve API
- **Buy/Sell stocks** with real-time updates
- **Holdings & Watchlist charts** (Chart.js)
- Validations using **Bootstrap**
- Fully responsive **React dashboard**
- MongoDB storage for users, orders, and portfolio

---

## 🛠 Tech Stack
**Frontend:** React, React Router, Chart.js, Bootstrap  
**Backend:** Node.js, Express.js, JWT, bcryptjs  
**Database:** MongoDB  
**API:** Twelve Data API  

---

## 📁 Project Structure
Zerodha/
│── frontend/ # Landing page, login/signup
│── dashboard/ # Main trading dashboard
│── backend/ # APIs + MongoDB
└── package.json # Workspaces (concurrently)


## ⚙️ Setup
```bash
git clone https://github.com/Omkar-1128/Zerodha.git
cd Zerodha
npm install
npm run dev
