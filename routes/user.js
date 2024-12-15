const { Router } = require('express');
const User = require('../models/user');
const { createHmac, randomBytes } = require('crypto');

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        await User.create({
            fullName,
            email,
            password
        });
        console.log(req.body)
        return res.redirect('/');
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        return res.status(500).send('Đã xảy ra lỗi khi đăng ký.');
    }
});

router.post('/signin', async (req, res) => {
    console.log('Hi from signin');
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('invalid email or password!');
    }

    const hashedPassword = createHmac('sha256', user.salt) 
                .update(password)
                .digest('hex');

    if (user.password === hashedPassword) {
        console.log('User:', user);
        
        return res.redirect('/');
    } else {
        return res.status(400).send('Mật khẩu không chính xác');
    }
});

module.exports = router;


