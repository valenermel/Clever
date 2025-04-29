import app from './app.js'
import {connectdb} from './config/db.js'

connectdb();
app.listen(4000);
console.log('Server on port:',4000);