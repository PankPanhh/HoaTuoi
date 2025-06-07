const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, 'public/mock-db.json');

app.use(cors());
app.use(bodyParser.json());

// Đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
  }
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
  if (db.users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Email đã tồn tại.' });
  }
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
    phone,
    address,
    orderHistory: [],
    role: 'customer'
  };
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
});

// Lấy danh sách user
app.get('/api/users', (req, res) => {
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  res.json({ users: db.users || [] });
});

// Lưu user đăng nhập (cập nhật thông tin user)
app.post('/api/save-current-user', (req, res) => {
  const user = req.body;
  if (!user || !user.email) {
    return res.status(400).json({ message: 'Thiếu thông tin user.' });
  }
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
  const idx = db.users.findIndex(u => u.email === user.email);
  if (idx !== -1) {
    db.users[idx] = { ...db.users[idx], ...user };
  } else {
    db.users.push(user);
  }
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ message: 'Đã lưu user đăng nhập.' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
