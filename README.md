This is a [Next.js](https://nextjs.org/) project based off the Redis Full Text Search tutorial from [fireship-io](https://github.com/fireship-io/redis-nextjs-fulltext-search).

## Getting Started

First, download and run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start creating entries by inputting information into the fields and search for that entry using the search input at the bottom.

## Goal Of This Project

The purpose of this project is to get familiar with Next.js and using Redis as a primary database. 

## What I have learned

Next.js provides perfect structure for building web applications which makes the development process a lot smoother.
I have yet to see the benefits of server side rendering but will pursue this in a future project.
Working with Redis and the Redis Insight GUI also provided me with easier access to the database to confirm saved data. However, I see this as only a benefit for small applications and not for larger application that rely on scalability and the ability to see how data is related.
For that reason I will develop an application that utilizes PostgreSQL for the database and Redis as a cache to support it.

##Issues I ran into
I ran into an issue loading the SWC binary but found a [fix here](https://stackoverflow.com/questions/69816589/next-failed-to-load-swc-binary). Unforunately I had to lose the benefit of the rust compiler but for this small project it doesn't matter.

When I went to go check on my data using Redis Insight I noticed the data was saved as a Hash Data Structure which doesn't support nested objects like the desired JSON I had intended to use. The application still works, however I will have to do more research into the differences using a Hash and JSON.
