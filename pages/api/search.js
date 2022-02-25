import { searchCars } from "../../lib/redis";

export default async function handler (req, res) {
    //grab search query from url
    const q = req.query.q;
    //call search cars method
    const cars = await searchCars(q);
    res.status(200).json({cars});
}