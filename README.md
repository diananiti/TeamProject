# Team-Project-Manager

How to start:

1. Download repository
2. Run `npm install`
3. Run `npm run start`

## Backend
How to start:

1. In terminal Go to directory `...\Team-Project-Manager\backend`
2. On windows run `.\gradlew.bat clean bootRun`

### Test GraphQL API

#### Graphiql
1. In web browser go to http://localhost:8080/graphiql 
2. Now you are in "Web IDE for testing Graphql APIs"

##### Sample working queries:
get all users
```javascript 
{users{
  id
  name
 }
}
```
get user by id
```javascript 
{user(id: 7){
  id
  name
  }
}
```
get user by name
```javascript 
{userByName(name: "Potter"){
  id name
  }
}
```
save new user
```javascript
mutation{
  saveUser(user: {name: "Draco"}) {
    id
    name
  }
}
```

#### Another way of testing queries (without Graphiql - not recommended)
bash
```bash
curl -X POST -H "Content-Type: application/json"  --data '{ "query": "{user(id:1){id,name}}" }' http://localhost:8080/graphql

```
web browser console using fetch
1. Enter web browser http://localhost:8080/ (it need to be open on the andres and port where where grahql API is served, otherwise browser CORS policy will block query)
2. Click `F12` and web console will open
3. Enter `query` and press `Enter`, voila  
```javascript
    fetch("http://localhost:8080/graphql", {
        body: "{ \"query\": \"{user(id:1){id,name}}\" }",
                headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
        .then(function(response) {
        return response.json();
        })
        .then(function(myJson) {
        console.log(JSON.stringify(myJson));
        });
```
### Test DB
#### H2
1. When applicatin is started go to page http://localhost:8080/h2-console/
2. Check that `JDBC URL` is `jdbc:h2:mem:testdb`
3. User and password is default ( **user**: *"sa"*, **password**: *leave empty*)
4. Then `Connect`

### PostgreSQL
To run DB you need to:
1. Install *PostgreSQL* locally. During installation you should:
    * set password to project (if you use other password it should be changed in confiruation file - `hibernate.clg.xml`),
    * set port to *5432* which is selected automatically during installation.
2. Afterwards open *PostgreSQL* you need to create new DB called '**Team_Project_Manager**',
3. Run project uploaded by Tomek and it should generate all tables with proper fields and primary keys.



Online document:

https://docs.google.com/document/d/1xoVw5CaZ5abTnPjCGj-hJinrUhWqyg9f4VEo1H6KH3s/edit?usp=drivesdk
# ITAPP
