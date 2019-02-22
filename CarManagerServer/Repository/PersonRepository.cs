using System.Collections.Generic;
using System.Linq;

public class PersonRepository
{
    private readonly DefaultDb _context;

    public PersonRepository(DefaultDb context)
    {
        _context = context;
    }

    public IEnumerable<Person> GetPeople()
    {
        IEnumerable<Person> people = _context.People;

        return people;
    }

    public bool UpdatePerson(Person person)
    {
        if (person == null) return false;

        var carOwner = GetPersonByCarId(person.CarId);
        if (carOwner != null && carOwner.PersonId != person.PersonId)
        {
            return false;
        }

        if (person.CarId != null)
        {
            var carExists = _context.Cars.Any(t => t.CarId == person.CarId);
            if (!carExists)
            {
                return false;
            }
        }

        if (person.PersonId == 0)
        {
            _context.People.Add(person);
            return true;
        }
        else
        {
            _context.People.Update(person);
            return true;
        }
    }

    public int DeletePerson(int id)
    {
        Person person;
        person = _context.People.Find(id);
        if (person == null)
        {
            return 0;
        }
        _context.People.Remove(person);
        return 1;
    }

    public Person GetPersonById(int? id)
    {
        if (id == null) return null;
        var person = _context.People.SingleOrDefault(x => x.PersonId == id);
        return person;
    }

    public Person GetPersonByCarId(int? id)
    {
        if (id == null) return null;
        var person = _context.People.SingleOrDefault(x => x.CarId == id);
        return person;
    }
}