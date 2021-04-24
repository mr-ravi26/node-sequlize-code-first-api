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
![image](https://user-images.githubusercontent.com/30143637/115961640-ec85b480-a534-11eb-81db-43f0e039dc5f.png)



## Postman Samples

### Users
#### Get Users List
![image](https://user-images.githubusercontent.com/30143637/115951516-c2b19b00-a4fe-11eb-9fa8-f5480ca668a0.png)

#### Create User
![image](https://user-images.githubusercontent.com/30143637/115951527-d52bd480-a4fe-11eb-92e5-7ef945c71df8.png)

#### Update User
![image](https://user-images.githubusercontent.com/30143637/115951539-e4ab1d80-a4fe-11eb-9037-30a14c7dbb6c.png)

#### Get User Detail
![image](https://user-images.githubusercontent.com/30143637/115951551-fa204780-a4fe-11eb-9bde-f60d5e24916c.png)



### Subscription
#### Get Users Subscription
![image](https://user-images.githubusercontent.com/30143637/115961701-3373aa00-a535-11eb-9d94-b9e7a7432e59.png)

#### Create Subscription
![image](https://user-images.githubusercontent.com/30143637/115961668-0c1cdd00-a535-11eb-955a-396e13443e86.png)

#### Get Users Subscription on date
![image](https://user-images.githubusercontent.com/30143637/115968614-61b5b180-a556-11eb-8cd6-de42fb875afc.png)


The most challenging part with Sequelize

```javascript
let checkForDate = moment(req.params.start_date).format("YYYY-MM-DD HH:MM:SS");
        console.log("checkForDate", checkForDate);

        const dateQuery = `DATE_PART('day', '${checkForDate}' - "subscriptions"."start_date")`

        return User
            .findAll({
                where: {
                    id: req.params.user_id,
                },
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Subscription,
                        as: 'subscriptions',
                        attributes: [
                            'start_date', 'days_left', 'valid_till'
                        ],
                        include: [
                            {
                                model: Plan,
                                as: 'plan',
                                attributes: ['code', 'validity', 'cost'],
                                where: {
                                    [Op.or]: [
                                        sequelize.where(
                                            sequelize.cast(sequelize.col('validity'), 'integer'),
                                            {
                                                [Op.or]: [
                                                    {
                                                        [Op.gte]: sequelize.literal(dateQuery)
                                                    },
                                                    { [Op.eq]: -1 }
                                                ]
                                            }
                                        )
                                    ],
                                }
                            }
                        ]
                    }
                ]
            })
            .then(users => res.status(200).send(users))
            .catch(error => {
                console.error("User subscription load error", error)
                res.status(400).send(error)
            });
```









