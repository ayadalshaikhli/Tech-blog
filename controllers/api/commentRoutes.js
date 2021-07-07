const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentdata = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentdata) {
        res.status(404).json({ message: 'No comment found!' });
        return;
      }
  
      res.status(200).json(commentdata);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userid: JSON.stringify(req.session.user_id),
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;