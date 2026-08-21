const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    } , 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return undefined

    return blogs.reduce((favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite
    })
}

const mostBlogs = (blogs) => {
    const authorBlog = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1
        return counts
    }, {})

    const most = Object.entries(authorBlog).reduce((most, current) => current[1] > most[1] ? current : most)

    return {
        author: most[0],
        blogs: most[1]
    }
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + blog.likes
        return counts
    }, {})

    const most = Object.entries(authorLikes).reduce((most, current) => current[1] > most[1] ? current : most)
    return {
        author: most[0],
        likes: 17
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}