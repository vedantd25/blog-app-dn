using BlogApp.Models;

namespace BlogApp.Services;

public class UserService : IUserService
{
    private readonly List<User> _users = new();
    private int _nextId = 1;

    public User? GetByEmail(string email)
        => _users.FirstOrDefault(u => u.Email == email);

    public void Create(User user)
    {
        user.Id = _nextId++;
        _users.Add(user);
    }
}
