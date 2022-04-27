"use strict";

import { env } from '../settings/config.js';
import express from 'express';
import { router } from '../settings/router.js';
import bodyParser from "body-parser";

let app = express();

app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Router
app.use(router())


// lance le run
// On récupère les urls de la page
// On filtre les urls récupérées (Même base url) et on ajoute la base url au url relative
// On relance la récupération sur les nouvelles pages tant que la liste d'url <= limit
// On retourne la liste d'url
// On lance un run via l'API YLB (model a créer)
// On récupère les IDs des runs
// On récupère les résulats des runs
// On retourne les résulats 
// On écrit le résultat des runs dans un fichier GSheet

app.listen(env.port, () => {
  console.log(`Serveur à l'écoute : http://${env.host}:${env.port}`)
})