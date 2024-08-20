import User from '../../../modules/users/infra/typeorm/entities/User';
import Appointment from '../../../modules/appointments/infra/typeorm/entities/Appointment';
import UserToken from '../../../modules/users/infra/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [User, UserToken,Appointment],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

dataSource.initialize();

export default dataSource;