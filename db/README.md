## expressmoney-db
database installator 

## Getting started
```
npm install
```

## Configuring environment
Reused credentials from  `.env` file in the project root with the following contents (edit values accordingly):
```
# database connection
DB_SCHEMA = oero
DB_HOST="localhost"
DB_PORT=5432
DB_DATABASE = postgres
DB_USER = postgres
DB_PASSWORD = <insert-password-here>
```

## Scripts
`npm run db:recreate` recreate database structure. *Warning!* All existing data will be deleted permanently.

`npm run db:update` update database structure.

`npm run db:clean` clean database structure. *Warning!* All existing data will be deleted permanently.
