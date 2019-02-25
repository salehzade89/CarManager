import { Car } from './car';

export class Person {
    personId: number;
    name: string;
    surname: string;
    age: number;
    carId?: number;
    car?:Car;
}