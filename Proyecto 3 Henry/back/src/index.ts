import server from "./server";
import { PORT } from "./config/envs"
import { AppDataSource } from "./config/dataSource";
import "reflect-metadata";

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`); 
        });
    })
    .catch((err) => {
        console.log(`Database connection error: ${err.message}`);
    })