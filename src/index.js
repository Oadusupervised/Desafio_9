import express from 'express'
import carts from './localStorage/carts.json' assert { type: 'json' }
import messages from './localStorage/messages.json' assert { type: 'json' }
import products from './localStorage/products.json' assert { type: 'json' }
import { cartModel } from './models/carts.js';
import { messageModel } from './models/messages.js';
import { productModel } from './models/products.js';
import { engine } from 'express-handlebars'
import { conectar } from './models/index.js'
import hbs from 'handlebars'
import { routerVistas } from './routers/views.router.js'
import { PORT } from './config/port.js'
import { apiRouter } from './routers/api.routers.js';
import { CartManager} from './Managers/CartManager.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from '../src/config/auth.config.js'

await conectar()

const app =express()

app.listen(PORT,()=>{
    console.log(`escuchando en puerto ${PORT}`)
    console.log('usar localhost:8080/views/realTimeProducts')
    console.log('usar localhost:8080/views/realTimeMessages')
    console.log('usar localhost:8080/views/realTimeCarts')
    console.log('usar localhost:8080/register')
    console.log('usar localhost:8080/login')
    console.log('usar localhost:8080/views/current')

})
app.use(cookieParser(COOKIE_SECRET))

//await cartModel.insertMany(carts)
//await messageModel.insertMany(messages)
//await productModel.insertMany(products)

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
})
app.use(cors({ origin: "*" }));

app.use(express.static("./public"));
app.use(express.json())
//app.use(session)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/views',routerVistas)
app.use('/api',apiRouter)
//app.use('/', webRouter)

//await cartModel.find().populate('nombreProducts.product')


//console.log(cartManager.buscarCosas() + 'estos son los carritos')