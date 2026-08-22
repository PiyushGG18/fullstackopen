const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Test1",
        author: "testAuthor",
        url: "https://example.com",
        likes: 0,
    },
    {
        title: "Test2",
        author: "testAuthor2",
        url: "https://example2.com",
        likes: 2,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb,
}