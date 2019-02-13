using System.Collections.Generic;

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

    public void UpdatePerson(Person person)
    {
        if (person == null) return;

        if (person.PersonId == 0) {
           _context.People.Add(person);
        } else {
            _context.People.Update(person);
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
}