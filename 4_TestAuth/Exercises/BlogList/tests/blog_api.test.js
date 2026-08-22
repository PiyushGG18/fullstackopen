const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs/')

    const blogs = response.body
    blogs.forEach(blog => {
        assert(blog.id)
        assert(!blog._id)
    })
})

test('HTTP POST request to the /api/blogs URL successfully creates a new blog', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "tester",
        url: "https://test.com",
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('Test Blog'))
})

test('Default value of likes is set to 0', async () => {
    const newBlog = {
        title: "Test Blog 2",
        author: "tester2",
        url: "https://test2.com",
    }

    const result = await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(result.body.likes, 0)
})

test('Missing title and url is rejected', async () => {
    const newBlog = {
        author: 'tester3',
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb() 
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


after(async () => {
    await mongoose.connection.close()
})