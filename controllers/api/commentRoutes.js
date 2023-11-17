const { Comment, User } = require('../../models');
//
const commentController = {
  // Get all comments for a specific blog post
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        where: { blog_post_id: req.params.postId },
        include: [{ model: User, attributes: ['username'] }],
      });

      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Create a new comment for a specific blog post
  createComment: async (req, res) => {
    try {
      const { commentText, userId } = req.body;

      const newComment = await Comment.create({
        comment_text: commentText,
        user_id: userId,
        blog_post_id: req.params.postId,
      });

      res.json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update a comment by ID (if needed)
  updateComment: async (req, res) => {
    try {
      const { commentText } = req.body;

      const updatedComment = await Comment.update(
        { comment_text: commentText },
        { where: { id: req.params.id } }
      );

      if (updatedComment[0] === 0) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      res.json({ message: 'Comment updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a comment by ID (if needed)
  deleteComment: async (req, res) => {
    try {
      const deletedCommentCount = await Comment.destroy({
        where: { id: req.params.id },
      });

      if (deletedCommentCount === 0) {
        res.status(404).json({ error: 'Comment not found' });
        return;
      }

      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = commentController;
