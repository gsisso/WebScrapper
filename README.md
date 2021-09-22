# WebScrapper
Simple web scrapper


# What has been done
1. Created `/parse` end points that receives a link and adds it to the DB.
Afterwards it builds a random array of URL's that were preset, adds each URL synchronously and at the end verifies that all the URL's were sent properly before sending a response to the client.

2. Created RabbitMQ consumer (`worker.ts`) that reads the messages from RabbitMQ(URL's that were sent in the `/parse` endpoint) and then uses the same functionality that the `/parse` endpoint used.

## How to run

1. Make sure MariaDB installed (can be downloaded from [here](https://mariadb.com/downloads/))
2. Make sure RabbitMQ is installed (can be downloaded from [here](https://www.rabbitmq.com/download.html))
3. Clone the repository from Github
4. Create a new DB in MariaDB and then create a table called `web_links` using 
   >CREATE TABLE `web_links` ( `url` VARCHAR(255) NOT NULL, `content` LONGTEXT, PRIMARY KEY (`url`) );
5. Install all package dependencies using 
>npm i
6. create `.env` file in project root according to `.env.example` 
7. Run the service using 
> npm start


## Assumptions
1. We would like to store both http & https version of the same link (not considered as 'duplicate')
2. All messages being sent to queue are received (no failures in the connection / queue is never full)
3. We want to parse URL's only one time so even if the content was changed the content would not be parsed nor updated in our DB
4. URL content is not larger than 'LONGTEXT'

## What can be improved

1. Add logs in certain parts to be able to debug & detect issues with the service
2. Use `flywaydb` to build MariaDB schema
3. Use ORM to connect & query MariaDB for better agility (let us switch vendors easily)
4. Add protection for `/parse` endpoint, currently anyone can send URL's to parse
5. Add `insert_time` and `updated_time` in `web_links` schema to be able to have better understanding of our data and being able to parse again when a certain time has passed
6. Split `server.ts` and `worker.ts` to 2 different services
7. OOP (?)
8. Add tests
9. Minify HTML content (?)
