import express from "express";
import run from "../controllers/RunController.js";

export const router = () => {

  const router = express.Router();

  router.route('/')
    .get((req, resp) => {
      // resp.render('pages/index', { test: "test" })
      run.launch(req, resp)
        .then(resp => console.log("END : ", resp))
    })
    .post((req, resp) => {
        
      // run.launch(req, resp)
      //   .then(resp => console.log(resp.status))
      //   .catch(err => {
      //     console.error("Un problème est survenu pendant l'exécution du run")
      //     console.err(err)
      //   })
    });

  return router;
}