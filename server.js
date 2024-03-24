import app  from "./src/config/serverConfig.js";
import db from './src/models/index.js';



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));


