<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute Develop

1. Clone repository
2. Execute 
```
npm install
```

3. Nest cli Installed
```
npm i -g @nestjs/cli
```

4. Run up database
```
docker-compose up -d
```

5. Rename ```env-template``` to ```.env```

6. Fill the variables .env

7. Reload database with seed

```
  localhost:3000/api/v2/seed
```

## Used Stack
* MongoDB
* Nest