using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApp.Models;
using System.Security.Claims;


namespace BlogApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BlogPostsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _context.BlogPosts.ToListAsync();
        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        return post == null ? NotFound() : Ok(post);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] BlogPost post)
    {
        post.AuthorEmail = User.Identity?.Name;
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return Ok(post);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] BlogPost post)
    {
        var existing = await _context.BlogPosts.FindAsync(id);
        if (existing == null) return NotFound();

        var email = User.FindFirst(ClaimTypes.Name)?.Value;
        if (existing.AuthorEmail != email)
            return Forbid("You can only update your own posts.");

        existing.Title = post.Title;
        existing.Content = post.Content;
        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _context.BlogPosts.FindAsync(id);
        if (existing == null) return NotFound();

        var email = User.Identity?.Name;
        if (existing.AuthorEmail != email)
            return Forbid("You can only delete your own posts.");

        _context.BlogPosts.Remove(existing);
        await _context.SaveChangesAsync();

        return Ok("Post deleted.");
    }
}
