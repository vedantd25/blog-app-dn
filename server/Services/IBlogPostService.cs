using BlogApp.Models;

namespace BlogApp.Services;

public interface IBlogPostService
{
    List<BlogPost> GetAll();
    BlogPost? GetById(int id);
    void Create(BlogPost post);
    void Update(BlogPost post);
    void Delete(int id);
}
