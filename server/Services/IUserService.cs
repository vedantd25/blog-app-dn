using BlogApp.Models;

namespace BlogApp.Services;

public interface IUserService
{
    User? GetByEmail(string email);
    void Create(User user);
}
