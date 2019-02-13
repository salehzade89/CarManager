using System.ComponentModel.DataAnnotations.Schema;

public class Person
{
    public int PersonId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public int Age { get; set; }
    public int? CarId { get; set; }

    [NotMapped]
    public Car Car { get; set; }
}