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
    
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        console.log('Token : ',token)

        return res.cookie('token', token).redirect('/')
    } catch(e ){
        return res.render('signin', {
            error : 'Incorrect email or password !'
        })
    }
});

module.exports = router;


