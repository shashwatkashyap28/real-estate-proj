import Blog from '../models/blog.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

const slugify = (str) =>
  (str || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const createBlog = async (req, res, next) => {
  try {
    const requester = await User.findById(req.user.id);
    if (!requester || !requester.isAdmin) {
      return next(errorHandler(403, 'Only admins can publish blog posts!'));
    }

    const slug = (req.body.slug && req.body.slug.trim()) || slugify(req.body.title);

    const blog = await Blog.create({
      ...req.body,
      slug,
      userRef: req.user.id,
    });
    return res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(errorHandler(404, 'Blog post not found!'));

    if (req.user.id !== blog.userRef) {
      const requester = await User.findById(req.user.id);
      if (!requester || !requester.isAdmin) {
        return next(errorHandler(403, 'You can only delete your own blog posts!'));
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Blog post has been deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(errorHandler(404, 'Blog post not found!'));
    }

    if (req.user.id !== blog.userRef) {
      const requester = await User.findById(req.user.id);
      if (!requester || !requester.isAdmin) {
        return next(errorHandler(403, 'You can only update your own blog posts!'));
      }
    }

    const slug =
      (req.body.slug && req.body.slug.trim()) || slugify(req.body.title || blog.title);

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug },
      { new: true }
    );
    return res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(errorHandler(404, 'Blog post not found!'));
    }
    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let category = req.query.category;
    if (category === undefined || category === 'All') {
      category = { $regex: '', $options: 'i' };
    }

    let status = req.query.status;
    let statusFilter;
    if (status === 'all') {
      statusFilter = { $in: ['draft', 'published'] };
    } else if (status === 'draft' || status === 'published') {
      statusFilter = status;
    } else {
      statusFilter = 'published';
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const blogs = await Blog.find({
      title: { $regex: searchTerm, $options: 'i' },
      category,
      status: statusFilter,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};