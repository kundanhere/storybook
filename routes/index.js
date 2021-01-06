const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middlewares/validate');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  let name = !req.user ? 'Guest' : req.user.firstName;
  res.render('dashboard', { name });
});

module.exports = router;
