const express = require('express');
const app = express();


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});


//Use code below instead once controllers are set up
// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('./config/connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
// });