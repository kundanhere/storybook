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

// @desc Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', { stories });
  } catch (err) {
    console.error(err);
    res.render('errors/500');
  }
});

// @desc Show story edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();
  if (!story) {
    return res.render('errors/404');
  }

  if (story.user != req.user.id) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', { story });
  }
});

module.exports = router;
