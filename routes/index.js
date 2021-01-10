const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middlewares/validate');
const Story = require('../models/Story');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    let name = !req.user ? 'Guest' : req.user.firstName;
    let stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', { name, stories });
  } catch (err) {
    console.error(err);
    res.render('errors/500');
  }
});

module.exports = router;
