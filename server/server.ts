import http from "http";
import { connectRedis } from "./services/redis";
import api from "./api";
import keys from "./config/keys";
import { connectMySQL } from "./services/mysql";

(async () => {
    const server = http.createServer(api);
	await connectRedis();
	await connectMySQL();
    server.listen(process.env.PORT, () => {
        console.log("Server is listening on port 8000");
    });
})();
