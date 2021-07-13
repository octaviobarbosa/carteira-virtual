import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "../../categories/entities/Category";
import { User } from "../../users/entities/User";

@Entity("transactions")
class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  operation: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  to_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "to_user_id" })
  to_user: User;

  @Column()
  from_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "from_user_id" })
  from_user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Transaction };
