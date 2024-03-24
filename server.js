import app  from "./src/config/serverConfig.js";
import db from './src/db/dbConnection.js';

// Checking database connection
db.authenticate()
    .then(() => console.log('Database Connected Successfully'))
    .catch((e) => console.log(e.message));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));


