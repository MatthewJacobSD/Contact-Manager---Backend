# 📇 Contact Manager API - Backend

**Keep your contacts organized, secure, and drama-free** ✨  
*A Node.js + Express + MongoDB backend with maximum vibes*

![API Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJ0dXJ1bWJ5b3Z6dGZ5Z2Z5Z2Z5Z2Z5Z2Z5Z2Z5Z2Z5Zw==/giphy.gif)  
*(Pretend this is a cool demo gif)*

---

## 🚀 Features
- **CRUDdy Contacts** - Create, Read, Update, Delete like a pro
- **JWT Auth** - Secure AF 🔒
- **Emoji-Powered Errors** - Because plain text is boring
- **MongoDB Magic** - NoSQL? More like NoProblem!
- **Gen-Z Approved** - 100% more sass than your average API

---

## 💻 Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| **Framework**  | Express.js                          |
| **Database**   | MongoDB + Mongoose                  |
| **Auth**       | JWT + Bcrypt                        |
| **Style**      | Maximum sass 😎                     |
| **Linting**    | ESLint (when you get around to it)  |

---

## 🛠️ Setup

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/your-repo/contact-manager-backend.git
cd contact-manager-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment
Create a `.env` file:
```env
MONGODB_URL=mongodb://localhost:27017/contact-manager
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

### 4️⃣ Run the server
```bash
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint           | Description                     | Auth Required |
|--------|--------------------|---------------------------------|---------------|
| POST   | `/api/users/register` | Register new user              | ❌            |
| POST   | `/api/users/login`    | Login existing user            | ❌            |
| GET    | `/api/users/current`  | Get current user profile       | ✅            |
| GET    | `/api/contacts`       | Get all your contacts          | ✅            |
| POST   | `/api/contacts`       | Add new contact                | ✅            |
| GET    | `/api/contacts/:id`   | Get specific contact           | ✅            |
| PUT    | `/api/contacts/:id`   | Update contact                 | ✅            |
| DELETE | `/api/contacts/:id`   | Delete contact (ghost them 👻) | ✅            |

---

## 🎮 Example Requests

### 📌 Register User:
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"cooluser", "email":"hello@example.com", "password":"supersecret123"}'
```

### 📌 Add Contact:
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Taylor", "lastname":"Swift", "email":"tay@taylorswift.com", "phoneNo":"1234567890"}'
```

---

## 🤝 Contributing

1. **Fork it**
2. **Branch it** (`git checkout -b your-feature`)
3. **Commit it** (`git commit -am 'Added some dope features'`)
4. **Push it** (`git push origin your-feature`)
5. **PR it**

💡 *Basic etiquette applies - don't push to main like a caveman*

---

## 📜 License

MIT © [MatthewJacobSD]  
*Translation: Do whatever, just don't sue me*

---

## 📖 Additional Notes

- Check out the [Swagger docs](http://localhost:5000/api-docs) after starting the server for interactive API testing!
- Future plans: 🛠 Add automated testing, Docker support, and deployment guides.

---

🔥 **Built with vibes and caffeine** ☕
```

### 🔥 **Why this works:**
✅ **Structured for clarity** - Sections are clearly labeled and easy to follow.  
✅ **Engaging yet informative** - Keeps the Gen-Z tone while delivering essential information.  
✅ **Future-proof** - Leaves room for additional features and expansions.  

Let me know if you need any tweaks! 🚀
