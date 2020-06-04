# todo

##### DB: postgresql
##### Back-end: Node js (Express js)
##### Front-end: React js

run ```npm i``` for install dependence \n
next run 
``` 
mkdir config
cd config
touch default.json
```

In file 

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

run ``` npm run dev ``` for nodemon server start
