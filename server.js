const app = require("./src/config/serverConfig.js");
const db = require('./src/models/index.js');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on  http://localhost:${PORT}`));



