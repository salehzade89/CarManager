using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

public class PersonController : Controller
{
    IDataContext _dataContext;
    public PersonController(IDataContext dataContext)
    {
        _dataContext = dataContext;
        //_personRepository.UpdatePerson(new Person { Name = "asdf" });
    }

    [HttpGet]
    [HttpPost]
    public Person[] GetPersons()
    {
        return _dataContext.PersonRepository.GetPeople().ToArray();
    }
  //  [HttpGet]
    [HttpPost]
    public int AddPerson([FromBody]Person person)
    {
        if (!ModelState.IsValid || person == null) return 0;

        _dataContext.PersonRepository.UpdatePerson(person);
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