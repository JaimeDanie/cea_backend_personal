import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    sapOrderNumber: string

    @Column({ nullable: false })
    productName: string

    @Column({ nullable: false })
    filler: string

    @Column({ nullable: false })
    operator: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}