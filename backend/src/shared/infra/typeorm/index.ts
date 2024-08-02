import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "postgres",
    entities: [
      "./src/models/*.ts"
    ],
    migrations: [
      "./src/database/migrations/*.ts"
    ]
});

dataSource.initialize();

export default dataSource;
