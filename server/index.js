const server = require('./server');
const app = server();
const PORT = process.env.PORT || 4000;

(async () => {
    
    try {
        app.listen(PORT, () => {
            console.log(`Listening @ http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`App failed to start: ${error}`);
    };
})();