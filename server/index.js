const server = require('./server');
const app = server();
const PORT = process.env.PORT || 4000;

(async () => {
    console.log(process.env.DB_URL_PROD);
    console.log(process.env.NODE_ENV);
    console.log(process.env.PORT);
    
    try {
        app.listen(PORT, () => {
            console.log(`Listening @ http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`App failed to start: ${error}`);
    };
})();