import { DataSource } from "typeorm";
import Appointment from "../../../modules/appointments/infra/typeorm/entities/Appointment";
import User from "../../../modules/users/infra/typeorm/entities/User";
import UserToken from "../../../modules/users/infra/typeorm/entities/UserToken";

const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "docker",
	database: "postgres",
	entities: [User, UserToken, Appointment],
	migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

dataSource.initialize();

export default dataSource;
