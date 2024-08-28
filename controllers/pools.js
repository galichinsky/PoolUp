const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const Pool = (require("../models/pool.js"));

// GET /pools (index functionality/action)
router.get('/', ensureLoggedIn, async (req, res) => {
  const pools = await Pool.find({}).sort('-createdAt').populate('user');
  res.render("pools/index.ejs", { pools });
})

// GET /pools/user (my pools functionality/action)
router.get('/user', ensureLoggedIn, async (req, res) => {
  const pools = await Pool.find({user: req.user._id}).sort('-createdAt').populate('user');
  res.render("pools/user.ejs", { pools })
})

// GET /pools/new (show functionality)
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

// DELETE
router.delete('/:poolId', async (req, res) => {
  req.body.user = req.user._id;
  await Pool.findByIdAndDelete(req.params.poolId);
  res.redirect('/pools/user')
  // res.send('Pool deleted')
})

// PUT /:poolId/edit (Show Edit functionality)
router.get('/:poolId/edit', async (req, res) => {
  req.body.user = req.user._id;
  const pool = await Pool.findById(req.params.poolId)
  res.render('pools/edit.ejs', { pool })
})

// PUT /:poolId (Update functionality)
router.put('/:poolId', async (req, res) => {
  try {
  req.body.user = req.user._id;
  await Pool.findByIdAndUpdate(req.params.poolId, req.body);
  res.redirect('/pools/user')
} catch (err) {
  console.error(err);
  res.redirect(`/:poolId/edit`)
}
})

module.exports = router;