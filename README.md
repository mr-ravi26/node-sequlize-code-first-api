# node-sequlize-code-first-api
Node, Express, Postgres, Sequelize, Code First approched REST API

## Create Models Command
### User Model

```python
sequelize model:create --name User --attributes name:string 
```

### Plan Model

```python
sequelize model:create --name Plan --attributes validity:string,cost:decimal 
```

### Subscription Model

```python
sequelize model:create --name Subscription --attributes plan_id:string,validity:string,cost:decimal
```


### Seeding Plans

```python
sequelize db:seed --seed seeders/20210423182753-Plan
```


#### Model Relationship
![image](https://user-images.githubusercontent.com/30143637/115913143-d5d85280-a48d-11eb-9225-394ebdb8e5a8.png)



## Postman Samples

#### Get Users List
![image](https://user-images.githubusercontent.com/30143637/115951516-c2b19b00-a4fe-11eb-9fa8-f5480ca668a0.png)

#### Create User
![image](https://user-images.githubusercontent.com/30143637/115951527-d52bd480-a4fe-11eb-92e5-7ef945c71df8.png)

#### Update User
![image](https://user-images.githubusercontent.com/30143637/115951539-e4ab1d80-a4fe-11eb-9037-30a14c7dbb6c.png)

#### Get User Detail
![image](https://user-images.githubusercontent.com/30143637/115951551-fa204780-a4fe-11eb-9bde-f60d5e24916c.png)








