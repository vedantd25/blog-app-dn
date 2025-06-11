using BlogApp.Models;

namespace BlogApp.Services;

public class BlogPostService : IBlogPostService
{
    private readonly List<BlogPost> _posts = new();
    private int _nextId = 1;

    public List<BlogPost> GetAll() => _posts;

    public BlogPost? GetById(int id) => _posts.FirstOrDefault(p => p.Id == id);

    public void Create(BlogPost post)
    {
        post.Id = _nextId++;
        post.CreatedAt = DateTime.UtcNow;
        _posts.Add(post);
    }

    public void Update(BlogPost post)
    {
        var existing = GetById(post.Id);
        if (existing != null)
        {
            existing.Title = post.Title;
            existing.Content = post.Content;
        }
    }

    public void Delete(int id)
    {
        var existing = GetById(id);
        if (existing != null)
        {
            _posts.Remove(existing);
        }
    }
}
