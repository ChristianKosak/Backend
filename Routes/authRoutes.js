const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();


module.exports = router;

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});




app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Aca se guarda el codigo
    
    res.redirect('/login');
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Aca compara contraseñas y usuarios
    
    if (usuarioValido) {
        req.session.userId = usuarioId; 
        res.redirect('/productos');
    } else {
        res.redirect('/login');
    }
});
