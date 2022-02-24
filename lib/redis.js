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
        description: { type: 'string' },
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