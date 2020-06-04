# todo

##### DB: postgresql
##### Back-end: Node js (Express js)
##### Front-end: React js


### Server

``` cd ./server ```

Run ```npm i``` for install dependences, then run:

``` 
mkdir config
cd config
touch default.json
```

In default.json:

```
{
  "port": 5000,
  "jwtSecret":"YOUR_JWT_SECRET",
  "dbConfig": {
    "user": "",
    "password": "",
    "host": "",
    "port": "5432",
    "database": "",
  }
}

```

Run ``` npm run dev ``` for nodemon server start


### Client

``` cd ./client ```

Run ```npm i``` for install dependences, then run ```npm start``` for run app