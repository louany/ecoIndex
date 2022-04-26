import { env } from '../config/config.js';
import express from 'express';
import bodyParser from "body-parser";
let app = express();

app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get('/', (req, resp) => {
  resp.render('pages/index', { test: "test" })
})
app.post('/', (req, resp) => {
  const run = new Run(req.body.url)
  console.log(run)
})

app.listen(env, () => {
  console.log(`Serveur à l'écoute : http://${env.host}:${env.port}`)
})