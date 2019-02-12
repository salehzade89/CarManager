using Microsoft.EntityFrameworkCore;

class DefaultDb : DbContext
{
    public DbSet<Person> People { get; set; }
    public DbSet<Car> Cars { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=blogging.db");
    }
}