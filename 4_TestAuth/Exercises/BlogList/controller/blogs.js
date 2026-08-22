const  blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.deleteOne({_id: id})
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    let blog = await Blog.findById(id)
    if(!blog) {
        return response.status(404).end()
    }

    blog.likes = request.body.likes
    const result = await blog.save()
    response.status(200).json(result)
})

module.exports = blogsRouter 