using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BlogApp.Models;
using BlogApp.Services;

namespace BlogApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController : ControllerBase
{
    private readonly IBlogPostService _blogPostService;

    public BlogPostsController(IBlogPostService blogPostService)
    {
        _blogPostService = blogPostService;
    }

    // Public - Get all blog posts
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_blogPostService.GetAll());
    }

    // Public - Get a single blog post by ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var post = _blogPostService.GetById(id);
        return post is null ? NotFound() : Ok(post);
    }

    // Protected - Create new blog post
    [HttpPost]
    [Authorize]
    public IActionResult Create(BlogPost post)
    {
        var email = User.Identity?.Name;
        post.AuthorEmail = email!;
        _blogPostService.Create(post);
        return Ok(post);
    }

    // Protected - Update a blog post
    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(int id, BlogPost post)
    {
        var existing = _blogPostService.GetById(id);
        if (existing == null)
            return NotFound();

        var email = User.Identity?.Name;
        if (existing.AuthorEmail != email)
            return Forbid("You can only update your own posts.");

        post.Id = id;
        post.AuthorEmail = email!;
        _blogPostService.Update(post);
        return Ok(post);
    }

    // Protected - Delete a blog post
    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        var existing = _blogPostService.GetById(id);
        if (existing == null)
            return NotFound();

        var email = User.Identity?.Name;
        if (existing.AuthorEmail != email)
            return Forbid("You can only delete your own posts.");

        _blogPostService.Delete(id);
        return Ok("Post deleted.");
    }
}
