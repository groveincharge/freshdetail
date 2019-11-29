// Bring Mongoose into the app 
const mongoose = require( 'mongoose' ); 
require('dotenv').config;

// Build the connection string 
let dbURI = process.env.MONGOOSE_KEY;

// Create the database connection 
mongoose.connect(dbURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {  
  console.log('Mongoose default connection open to process.env');
}); 

// If the connection throws an error
mongoose.connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// BRING IN YOUR SCHEMAS & MODELS // For example
require('./User');
require('./Contact');
require('./Product');
require('./Order');