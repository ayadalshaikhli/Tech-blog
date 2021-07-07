
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


  router.get('/editpost/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
          {
            model: Comment,
            include: {model: User}
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('editPost', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/createpost', (req, res) => {
    if (req.session.logged_in) {
      res.render('newPost', {logged_in: req.session.logged_in});
    }
});

router.post('/createpost', withAuth, async (req, res) => {

    try {
      console.log("INSIDE TRY FUNCTION")
      const createdpost = await Post.create({
        ...req.body,
        user_id: JSON.stringify(req.session.user_id)});

      res.status(200).json(createdpost);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/editpost/:id', withAuth, async (req, res) => {
    try {
      const updatePost= await Post.update(
        {title: req.body.title,
        post_content: req.body.post_content},
        {where: {id: req.params.id, user_id: req.session.user_id,}}
      );
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No Post Found' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;