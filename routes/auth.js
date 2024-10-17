const express = require('express');
const router = express.Router();

// การจัดการ login POST request
router.post('/login', (req, res) => {
    const { username } = req.body;

    // บันทึกชื่อผู้ใช้ใน session
    req.session.loggedIn = true;
    req.session.username = username; // เก็บชื่อผู้ใช้ใน session
    res.status(200).json({ success: true, message: 'Login successful', username });
});

// การจัดการ logout GET request
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/'); // redirect กลับไปที่หน้า login
    });
});

module.exports = router;
