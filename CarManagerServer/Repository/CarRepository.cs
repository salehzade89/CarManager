using System.Collections.Generic;
using System.Linq;

public class CarRepository
{
    private readonly DefaultDb _context;

    public CarRepository(DefaultDb context)
    {
        _context = context;
    }

    public IEnumerable<Car> GetAllCars()
    {
        IEnumerable<Car> cars = _context.Cars;
        return cars;
    }

    public Car GetCarById(int? id)
    {
        return _context.Cars.Find(id);
    }

    public void UpdateCar(Car car)
    {
        if (car == null) return;

        if (car.CarId == 0)
        {
            _context.Cars.Add(car);
        }
        else
        {
            _context.Cars.Update(car);
        }
    }
    public Car GetCarById(int id)
    {
        return _context.Cars.SingleOrDefault(x => x.CarId == id);
    }
    public int DeleteCar(int id)
    {
        Car car;
        car = _context.Cars.Find(id);
        if (car == null)
        {
            return 0;
        }
        var person = _context.People.SingleOrDefault(x => x.CarId == id);
        if (person != null)
        {
            person.CarId = null;
            _context.People.Update(person);
        }
        _context.Cars.Remove(car);
        return 1;
    }
}