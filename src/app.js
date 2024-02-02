const express = require('express');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager.json');

const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcrypt');

app.use(authRoutes);

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

    const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async function(username, password, done) {
       
    }
));

// Inicializa Passport y sessions
app.use(passport.initialize());
app.use(passport.session());



require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

    const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({

    secret: 'U8bV!f4@Xs6%h+1*wP3^qM2#z',   // Clave secreta
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://christiankosak:agustina1234sword>@databasecoder.kfti8d9.mongodb.net/?retryWrites=true&w=majority' }),
    cookie: { maxAge: 180 * 60 * 1000 } // Tiempo de vida de la cookie
}));



const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

const app = express();
const port = 8080;

const productManager = new ProductManager('./productos.json');
const cartManager = new CartManager('./carrito.json');

app.use(express.json());

app.get('/home.handlebars.js', (req, res) => {
    // Renderiza la vista home.handlebars
    res.render('home');
  });
  
  app.get('/realTimeProducts.handlebars.js', (req, res) => {
    // Renderiza la vista realtimeProducts.handlebars
    res.render('realtimeProducts');
  });

// Gestiom de productos
app.get('/api/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        await productManager.loadProducts();

        let products = productManager.getProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        await productManager.loadProducts();
        const product = productManager.getProductById(productId);

        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const product = productManager.addProduct(newProduct);
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

app.put('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        await productManager.loadProducts();
        const updatedProduct = productManager.updateProduct(productId, updatedFields);

        if (updatedProduct) {
            res.json({ updatedProduct });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        await productManager.loadProducts();
        const deletionResult = productManager.deleteProduct(productId);

        if (deletionResult) {
            res.json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado o no eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Gestion de carritos
app.post('/api/carts', async (req, res) => {
    try {
        const newCart = cartManager.createCart();
        res.json({ newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productsInCart = cartManager.getProductsInCart(cartId);

        if (productsInCart) {
            res.json({ productsInCart });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;

        const updatedCart = cartManager.addProductToCart(cartId, productId, quantity);

        if (updatedCart) {
            res.json({ updatedCart });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


io.on('connection', (socket) => {
    console.log('Cliente conectado');
  
    // Nuevo producto
    socket.on('nuevoProducto', (nuevoProducto) => {
      io.emit('nuevoProducto', nuevoProducto);
    });
  });

  const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: '9c63650c99d65f219eb0',
    clientSecret: 'f8569bbee14cd39ff52b72333d28885e0a1bbeb3T',
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
  }
));

const authRoutes = require('./routes/authRoutes.js');

// Otros middleware y configuraciones de tu aplicación...

app.use(authRoutes);

// Inicializar Passport y sessions
app.use(passport.initialize());
app.use(passport.session());

// Otro middleware y configuraciones de tu aplicación...


