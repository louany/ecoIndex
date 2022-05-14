import pageController from "./PageController.js";
let run; 

export default run = {
  launch: async function (req, resp) {
    await pageController.crawl("https://www.artwai.fr")
    return await pageController.getListUrls()
  }
}

//   launch(req, resp) {
//     // On récupère les urls de la page
//     // On filtre les urls récupérées (Même base url) et on ajoute la base url au url relative
//     // On relance la récupération sur les nouvelles pages tant que la liste d'url <= limit
//     // On retourne la liste d'url
//     // On lance un run via l'API YLB (model a créer)
//     // On récupère les IDs des runs
//     // On récupère les résulats des runs
//     // On retourne les résulats
//     // On écrit le résultat des runs dans un fichier GSheet
