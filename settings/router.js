import express from "express";
export const router = () => {

  const router = express.Router();

  router.route('/')
    .get((req, resp) => {
      resp.render('pages/index', { test: "test" })
    })
    .post((req, resp) => {

    });

  return router;
}