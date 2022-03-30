const app = require('./app');

const dotenv = require('dotenv');
const connect = require('./config/database');
const connectDatabase = require('./config/database');


dotenv.config({ path: 'config.env' });
connectDatabase();

const dt = new Date();
console.log(dt);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});