//** API endpoint  will handle write operations on the backend*/

import { createCar } from '../../lib/redis';

export default async function handler(req, res){
    //use request body from JSON data to create a new car
    const id = await createCar(req.body);

    //after redis writes the data a response is sent back to the client 
    // response includes unique id
    res.status(200).json({ id })
}