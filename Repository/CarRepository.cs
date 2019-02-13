using System.Collections.Generic;

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

    public void UpdateCar(Car car)
    {
        if (car == null) return;

        if (car.CarId == 0) {
           _context.Cars.Add(car);
        } else {
            _context.Cars.Update(car);
        }
    }

    public int DeleteCar(int id)
    {
        Car car;
        car = _context.Cars.Find(id);
        if (car == null)
        {
            return 0;
        }
        _context.Cars.Remove(car);
        return 1;
    }
}