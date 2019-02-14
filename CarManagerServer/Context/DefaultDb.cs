using Microsoft.EntityFrameworkCore;

public class DefaultDb : DbContext
{
    public DefaultDb(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Person> People { get; set; }
    public DbSet<Car> Cars { get; set; }
}