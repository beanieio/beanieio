# API

## users

### /users/login

#### /users/login POST
>/users/login POST occurs when a user attempts to log in. Authenticates user, provides a new JWT, and routes to main dashboard.

##### request body
| field | description | data type | examples |
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
```javascript
[
    {
        "message": "Login Successful!",
        "token": //a new JWT is generated
    }
]
```

### /users/signup

#### /users/signup POST
>/users/signup POST occurs when a user creates a new account. Returns 422 and message 'Username taken. Please enter a new username.' if user already exists. Otherwise, creates a new user and logs in, rerouting to main dashboard.

##### request body
| field | description | data type | examples |
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
```javascript
[
    {
        "message": "Thank you for signing up!",
        "token": //a new JWT is generated
    }
]
```

### /users/formconfig

#### /users/formconfig GET
>users/formconfig GET occurs when the app requires a user's customized lists of categories in order to render options in forms

##### request headers
Requires authorization headers as shown in example axios request

##### example axios request
```javascript
    axios.get('/api/users/formconfig',
      {
        headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}
      }).then(<handle response>)
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
>users/formconfig PUT updates the list of ingredients, emotional tags, and/or physical tags for a user

##### request headers
Requires authorization headers as shown in example axios request

##### example axios request
```javascript
    axios.get('/api/users/formconfig',
      {
        headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}
      }).then(<handle response>)
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

## entries

#### /entries GET
>/entries GET responds with an array of entry objects for the logged in user, sorted in reverse chronological order.

##### request body
| param | description | default | data type | examples |
|------------|-----------|------------|-----------|-----------|
| limit |   max number of entries to retrieve | 5 | Number | 10 |
| type |   type of entry to retrieve | all (returns all types if omitted) | String | 'Pulse', 'Meal', 'Sleep', 'Water', 'Exercise' |

>Enhance this to support querying by date

##### request body
Requires authorization headers to identify logged in user, as shown in example axios request.

##### example axios request
```javascript
    axios.get('/api/entries', {
      params: {
        limit: 2,
        type: 'Pulse'
        },
      headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}
    }).then(<handle response>)
```

##### Response JSON
```JSON
[
  {
    "_id" : "59d3c9671e277887d042a495",
    "userId" : "59d3c9561e277887d042a494",
    "datetime" : "2017-10-03T17:31:04.373Z",
    "type" : "Pulse", "physicalScore" : 4,
    "emotionalScore" : 2,
    "emotionalTags" : [ "Energized", "Relaxed" ],
    "physicalTags" : [ "Great All Around", "Sick" ],
    "ingredients" : [ ], "__v" : 0
  },
  {
    "_id" : "59d58dd187aa00348f95253c",
    "userId" : "59d573eebbac5a2ccd04d8f8",
    "datetime" : "2017-10-05T01:41:27.591Z",
    "type" : "Pulse",
    "physicalScore" : 3,
    "emotionalScore" : 4,
    "emotionalTags" : [ "Energized", "Stressed" ],
    "physicalTags" : [ "Sick", "Tired" ],
    "ingredients" : [ ],
    "__v" : 0
  }
]
```

## reports

#### report/correlations GET
>report/correlations GET responds with an itemized array of entry objects for the logged in user, sorted in reverse chronological order.

##### request body
| param | description | data type | examples |
|------------|-----------|------------|-----------|
| feeling |   feeling with which to correlate entries by time | String | 'Tired' |
| type |  which type of tag is associated with the feeling | String | 'physicalTags' or 'emotionalTags' |

##### request headers
Requires authorization headers to identify logged in user, as shown in example axios request.

##### example axios request
```javascript
    axios.get(‘/api/reports/correlation’, {
      params: {feeling: ‘Tired’, type: ‘physicalTags’},
      headers: {‘Authorization’: ‘bearer ’ + <method to retrieve JWT>}
    }).then(<handle response>);
```

##### Response JSON
```
[
  {
    "raw" : {
      "Meal": [],
      "Water: [],
      "Exercise": [],
      "Sleep": [],
      "Pulse": []},
    "pulseMatches": [],
    "mealMatches": []
  }
]
```

"raw" is separated raw data for past 2 weeks
"pulseMatches" are the pulses in past month with that feeling
"mealMatches" are the meals in the 12 hours preceeding any pulse that matched a feeling

## formdata

#### /formdata POST
> posts a new entry based on form input

#### request body
| param | description | data type | required for form type | examples |
|------------|-----------|"------------:|:-----------:|:-----------:|
| datetime | date and time | ISO date | all | "2017-10-03T17:31:04.373Z"|
| type | type of entry | String | all | 'Pulse' |
| ingredients | list of ingredients | array of strings | Meal | [ "gluten", "soy", "wheat", "shellfish" ] |
| sleepDuration | length of sleep in hours | Number | Sleep | 6 |
| sleepQuality | rating of sleep quality from 1 to 5 | Number | Sleep | 4 |
| exerciseDuration | duration of exercise in minutes | Number | Exercise | 60 |
| exerciseIntensity | intensity of exercise on a scale from 1 to 5 | Number | Exercise | 4 |
| waterAmount | amount of water in fl oz | Number | Water | 20 |
| physicalScore | rating of physical well being from 1 to 5 | Number | Pulse | 4 |
| emotionalScore | rating of emotional well being from 1 to 5 | Number | Pulse | 5 |
| physicalTags | list of physical tags selected by user | array of strings | Pulse |  [ "Great All Around", "Sick" ] |
| emotionalTags | list of emotional tags selected by user | array of strings | Pulse |  [ "Stressed", "Drained" ] |

##### request headers
Requires authorization headers to identify logged in user, as shown in example axios request.

#### example axios request
```javascript
    axios.post('/api/formdata', {
        type: 'Exercise',
        excDuration: 60,
        excIntensity: 4,
        datetime: "2017-10-05T01:41:27.591Z"
      }
      {headers: {'Authorization': 'bearer ' + <method to retrieve JWT>}
    }).then(<handle response>)
```

##### Response
Responds with status code 201 'Entry created' for successful form submission