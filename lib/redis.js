/**
 * @client main entry point for interacting with the database 
 * @connect will open db connection if it is not open 
 */

import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();


async function connect() {
    //connect to database
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

//Entity is like a DB table
//class will have a schema with properties of specific data types
// similar to hash keys in the database


class Car extends Entity {}
let schema = new Schema(
    Car,
    {
        make: { type: 'string' },
        model: { type: 'string' },
        image: { type: 'string' },
        //enable full text search for any fields - allows for data to be queried using
        //fuzzy matching which will recognize typos and common words but still return a result
        description: { type: 'string', textSearch: true },
    },
    {
        datastructure: 'JSON',
    }
);

export async function createCar(data) {
    //connects to DB client
    await connect();

    //creates a repo by combining params together
    const repository = new Repository(schema, client);

    //will create entity with JS object obtained from the form input
    const car = repository.createEntity(data);

    //commits to DB, redis will return auto generated id
    const id = await repository.save(car);

    return id;
}
// references the repository to create an index for Redis search 
export async function createIndex() {
    await connect();

    const repository = new Repository( schema, client);
    await repository.createIndex();
}

//searches for cars based on query input
export async function searchCars(q) {
    await connect();

    const repository = new Repository(schema, client);

    //search() method -pagination, able to retrieve first and last item
    //able to retrieve a count of total items in the DB
    const cars = await repository.search()
    //strict equality searching
        .where('make').eq(q)
        .or('model').eq(q)
    //any matching characters 
        .or('description').matches(q)
        .return.all();

        return cars
     
}