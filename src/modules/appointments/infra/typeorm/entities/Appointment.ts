import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import User from "../../../../users/infra/typeorm/entities/User";

@Entity("appointments")
class Appointment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	provider_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "provider_id" })
	provider: User;

	@Column(() => User)
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "user_id" })
	user: User;

	@Column("timestamp with time zone")
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Appointment;
