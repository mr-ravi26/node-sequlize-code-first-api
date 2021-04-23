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

#### Model Relationship
![image](https://user-images.githubusercontent.com/30143637/115913143-d5d85280-a48d-11eb-9225-394ebdb8e5a8.png)






