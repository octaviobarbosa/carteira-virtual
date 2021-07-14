import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../users/entities/User";

@Entity("payments")
class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  due_date: Date;

  @Column()
  payment_date: Date;

  @Column()
  is_automatic_debt: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Payment };
