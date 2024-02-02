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
    if (user== 'admin' && password== '12345') {
        
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        res.json({
            
        
            
            message: 'Autentificacion Exitosa', 
        passwordHash: hash,
        })

    } else {

        res.json({
            
        
            
            message: 'Autentificacion Invalida', 
        passwordHash: hash,
        })

        
    }

    
    
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



app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));


app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    
    res.redirect('/');
  });

