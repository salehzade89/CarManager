using Microsoft.AspNetCore.Mvc;

public class PersonController : Controller
{

    public PersonController()
    {
        using (var db = new DefaultDb())
        {
            db.People.Add(new Person {PersonId=1, Name = "asdf" });
          //  db.SaveChanges();
        }
    }

    [HttpGet]
    [HttpPost]
    public string[] GetPersons()
    {
        Person tmp;
        using (var db = new DefaultDb())
        {
            tmp = db.People.Find(1);
        }
        return new[] { tmp.Name, "B" };
    }
}