const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // เพิ่ม express-session
const app = express();
const port = 3000;

// ใช้ body-parser เพื่ออ่านข้อมูลจาก form POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// เพิ่มการตั้งค่า express-session
app.use(session({
    secret: 'your-secret-key', // ใช้ secret key สำหรับเซสชัน
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // หากใช้งาน HTTPS ให้ตั้งเป็น true
}));

// เสิร์ฟไฟล์ static เช่น HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// เสิร์ฟไฟล์ index.html ที่ root URL (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// เสิร์ฟไฟล์ request-form.html เมื่อผู้ใช้คลิกปุ่ม Request Form
app.get('/request-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'request-form.html'));
});

// เสิร์ฟไฟล์ dashboard.html เมื่อ login สำเร็จ
app.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/'); // redirect ไปที่หน้า login ถ้ายังไม่ได้ login
    }
});

// ใช้ routing จากไฟล์ auth.js
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// การจัดการ POST request สำหรับ /submit-request
app.post('/submit-request', (req, res) => {
    const { fullName, email, description } = req.body;

    // ตรวจสอบว่าข้อมูลถูกส่งมาครบถ้วน
    if (!fullName || !email || !description) {
        return res.status(400).send('Please provide all required fields.');
    }

    // บันทึกข้อมูล
    console.log(`Request from ${fullName} (${email}): ${description}`);

    // ส่งข้อความตอบกลับหลังจากรับข้อมูลสำเร็จ
    res.send('Your request has been submitted successfully.');
});

// เซิร์ฟเวอร์ทำงานที่ port 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});