using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

public class PersonController : Controller
{
    IDataContext _dataContext;
    public PersonController(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    [HttpPost]
    public Person[] GetPersons()
    {
        Person[] people;
        people = _dataContext.PersonRepository.GetPeople().ToArray();
        foreach (var item in people)
        {
            item.Car = _dataContext.CarRepository.GetCarById(item.CarId);
        }
        return people;
    }
    [HttpPost]
    public Person GetPersonById([FromBody]int id)
    {
        return _dataContext.PersonRepository.GetPersonById(id);
    }

    [HttpPost]
    public int AddPerson([FromBody]Person person)
    {
        if (!ModelState.IsValid || person == null) return 0;

        if (person.PersonId != 0)
        {
            var newPerson = person;
            var oldPerson = _dataContext.PersonRepository.GetPersonById(person.PersonId);
            oldPerson.Name = newPerson.Name;
            oldPerson.Surname = newPerson.Surname;
            oldPerson.Age = newPerson.Age;
            oldPerson.CarId = newPerson.CarId;
            person = oldPerson;
        }

        var res = _dataContext.PersonRepository.UpdatePerson(person);
        if (!res)
            return 0;
        _dataContext.Save();
        var id = person.PersonId;
        return id;
    }

    [HttpPost]
    public int DeletePerson([FromBody]int id)
    {
        var res = _dataContext.PersonRepository.DeletePerson(id);
        _dataContext.Save();
        return res;
    }
}