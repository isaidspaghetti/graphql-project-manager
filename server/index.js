const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const cors = require('cors')

console.log('NODE_ENV:', process.env.NODE_ENV);

const port = process.env.PORT || 5000;
const app = express();
connectDB();

app.listen(port, console.log(`Server running on port ${port}`))

app.use(cors())
app.use('/graphql', graphqlHTTP({
	schema,
	// graphiql: process.env.NODE_ENV === 'development'
	graphiql: true
}))
