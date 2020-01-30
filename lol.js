const axios = require('axios')

axios.get('http://localhost:5000').then(res => console.log(res.data))
