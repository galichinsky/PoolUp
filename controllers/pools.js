const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const Pool = (require("../models/pool.js"));

// GET /pools (index functionality/action)
router.get('/', ensureLoggedIn, async (req, res) => {
  const pools = await Pool.find({})
  res.render("pools/index.ejs", { pools })
})

// GET /pools/user (my pools functionality/action)
router.get('/user', ensureLoggedIn, async (req, res) => {
  const pools = await Pool.find({user: req.user._id})
  res.render("pools/user.ejs", { pools })
})


// GET /pools/new
router.get('/new', ensureLoggedIn, (req, res) => {
  console.log((req.params.userId));
  res.render('pools/new.ejs');
});

// POST /pools (create/functionalty/action)
router.post('/', async (req, res) => {
  try {
    req.body.user = req.user._id;
    req.body.date += 'T00:00';
    await Pool.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/pools')
})

// DELETE /
router.delete('/pool/user', async (req, res) => {
  try {
    const poolId = req.params.id;
    await Pool.findByIdAndDelete(poolId);
    res.redirect('/user')
  } catch (error) {
    console.log("Error: ", err);
    res.redirect("/");
  }
})

module.exports = router;