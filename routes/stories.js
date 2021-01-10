const router = require('express').Router();
const { ensureAuth } = require('../middlewares/validate');
const Story = require('../models/Story');

// @desc Show add story page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc Process stories add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('errors/500');
  }
});

module.exports = router;
