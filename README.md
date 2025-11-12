# Placio — Real Estate Listing Platform

Placio is a modern real estate listing platform where property owners can post their available rentals or sale listings.
Users can browse, search, and filter properties by price, type, or location.
It functions as a lightweight Zillow/OLX-style platform — with integrated ratings and reviews.

---

## **Tech Stack**

![React](https://skillicons.dev/icons?i=react) ![HTML](https://skillicons.dev/icons?i=html) ![CSS](https://skillicons.dev/icons?i=css) ![JavaScript](https://skillicons.dev/icons?i=js) ![Node.js](https://skillicons.dev/icons?i=nodejs) ![Express](https://skillicons.dev/icons?i=express) ![MongoDB](https://skillicons.dev/icons?i=mongodb) ![Firebase](https://skillicons.dev/icons?i=firebase) ![Tailwind](https://skillicons.dev/icons?i=tailwind) ![Git](https://skillicons.dev/icons?i=git) ![GitHub](https://skillicons.dev/icons?i=github) ![MUI](https://skillicons.dev/icons?i=mui)

### **Technology Table**

| Layer           | Technology                                                |   |
| --------------- | --------------------------------------------------------- | - |
| Frontend        | React, HTML, CSS, JavaScript, Tailwind, MUI               |   |
| Backend         | Node.js, Express                                          |   |
| Database        | MongoDB                                                   |   |
| Authentication  | Firebase Auth                                             |   |
| API             | RESTful Architecture, Axios                               |   |
| Version Control | Git, GitHub                                               |   |
| Alerts / UI     | SweetAlert2, react-toastify (no official icons available) |   |

---

## **Features**

### **User Features**

* Create an account using Firebase Authentication
* Browse all property listings with search and filter options
* View detailed property information with images and descriptions
* Add ratings and reviews to properties
* Track personal listings and review submissions

### **Seller / Admin Features**

* Add new properties for rent or sale
* Edit or delete own property listings

### **System Features**

* JWT-secured API
* Axios interceptor for secure API communication
* Protected routes for authenticated users
* RESTful backend architecture

---

## **Architecture Overview**

### **Frontend (React)**

* Component-driven UI
* React Router for navigation
* Axios for API communication
* Firebase for authentication
* TailwindCSS and MUI for styling
* Ratings integration with `@smastrom/react-rating` and `react-rater`
* Alerts & notifications with SweetAlert2 and react-toastify

### **Backend (Node + Express)**

* REST API structure
* JWT validation middleware
* Routes for Users, Properties, and Ratings
* Error handling and route protection

### **Database (MongoDB)**

* `Users` Collection
* `Properties` Collection
* `Ratings` Collection



## **Installation & Setup**

### 1. Clone Repository

```bash
git clone https://github.com/Riad-Zz/Placio
cd Placio
```

### 2. Client Setup

```bash
cd client
npm install
npm run dev
```

#### Client `.env`

```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

---

### 3. Server Setup

```bash
cd server
npm install
nodemon index.js
```

#### Server `.env`

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

---

## **Security**

* JWT-based authentication
* Axios interceptor attaches tokens automatically
* Auto logout on 401/403 response codes

---

## **Future Enhancements**

* Integrated chat between buyers and sellers
* Admin dashboard with analytics
* Advanced property recommendation system

---

Repository: [https://github.com/Riad-Zz/Placio](https://github.com/Riad-Zz/Placio)

Backend Repository: [https://github.com/Riad-Zz/Placio_Server](https://github.com/Riad-Zz/Placio_Server)
