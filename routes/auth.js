const express = require('express');
const router = express.Router();

// การจัดการ login POST request
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'pass') {
        req.session.loggedIn = true;
        res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
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

// การจัดการ logout POST request (ถ้าใช้งาน POST สำหรับ logout)
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/');
    });
});

module.exports = router;