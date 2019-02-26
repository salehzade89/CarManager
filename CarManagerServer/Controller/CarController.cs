using System.Linq;
using Microsoft.AspNetCore.Mvc;

public class CarController : Controller
{
    IDataContext _dataContext;

    public CarController(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    [HttpGet]
    [HttpPost]
    public Car[] GetCars()
    {
        return _dataContext.CarRepository.GetAllCars().ToArray();
    }
    [HttpGet]
    [HttpPost]
    public Car[] GetEmptyCars()
    {
        return _dataContext.CarRepository.GetEmptyCars().ToArray();
    }

    [HttpPost]
    public int UpdateCar([FromBody]Car car)
    {
        if (!ModelState.IsValid || car == null) return 0;
        _dataContext.CarRepository.UpdateCar(car);
        _dataContext.Save();
        var id = car.CarId;
        return id;
    }

    [HttpPost]
    public Car GetCarById([FromBody]int id)
    {
        return _dataContext.CarRepository.GetCarById(id);
    }

    [HttpPost]
    public int DeleteCar([FromBody]int id)
    {
        var res = _dataContext.CarRepository.DeleteCar(id);
        _dataContext.Save();
        return res;
    }
}