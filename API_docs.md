# API

## users

### /users/login

#### /users/login POST
/users/login POST occurs when a user attempts to log in. Authenticates user, provides a new JWT, and routes to main dashboard.

##### Parameters
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| username |  name of user | String |'newUser1' |
| password |  password of user | String | 'not123456' |

##### example axios request
```javascript
  axios.post('/api/users/login', {
    username: 'newUser1',
    password: 'not123456',
  }).then(<handle response>)
```

##### Response JSON
```JSON
[
    {
        "message": "Login Successful!",
        "token": <new JWT>
    }
]
```

### /users/signup

#### /users/signup POST
/users/signup POST occurs when a user creates a new account. Returns 422 and message 'Username taken. Please enter a new username.' if user already exists. Otherwise, creates a new user and logs in, rerouting to main dashboard.

##### Parameters
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| username |  name of new user | String |'newUser1' |
| email | email of new user | String | 'newUser1@newUser1.com'|
| password |  password of new user | String | 'not123456' |

##### example axios request
```javascript
  axios.post('/api/users/signup', {
    username: 'newUser1',
    email: 'newUser1@newUser1.com'
    password: 'not123456',
  }).then(<handle response>)
```

##### Response JSON
```JSON
[
    {
        "message": "Thank you for signing up!",
        "token": <new JWT>
    }
]
```

### /users/formconfig

#### /users/formconfig GET
users/formconfig GET occurs when the app requires a user's customized lists of categories in order to render options in forms

##### Parameters
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| header | authorization token | String |'bearer ' + token returned from authorization method |

##### example axios request
```javascript
    axios.get('/api/users/formconfig',
      {
          headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}}
    ).then(<handle response>)
```

##### Response JSON
```JSON
[
    {
        "ingredients": ["nuts", "wheat", "soy"],
        "emotional": ["stressed", "anxious", "drained", "angry"],
        "physical": ["tired", "sore", "headache", "energetic"]
    }
]
```

#### /users/formconfig PUT
users/formconfig PUT updates the list of ingredients, emotional tags, and/or physical tags for a user

##### Parameters
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| header | authorization token | String |'bearer ' + token returned from authorization method |

##### example axios request
```javascript
    axios.get('/api/users/formconfig',
      {
          headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}}
    ).then(<handle response>)
```

##### Response JSON
```JSON
[
    {
        "ingredients": ["nuts", "wheat", "soy"],
        "emotional": ["stressed", "anxious", "drained", "angry"],
        "physical": ["tired", "sore", "headache", "energetic"]
    }
]
```

