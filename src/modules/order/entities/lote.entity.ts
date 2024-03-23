import { NonConformity } from './../../non-conformity/entities/NonConformity.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'lote' })
export class Lote {

    @PrimaryColumn()
    numlote: number;

    @Column({ nullable: true })
    lider: string;

    @Column({ nullable: true })
    analista: string;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    brix: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    ph: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    acidez: number;

    @Column({ nullable: true })
    materialextranio: string;

    @Column({ nullable: true })
    puntonegro: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    porcentajesolido: number;

    @Column({ nullable: true })
    almidon: string;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    brixreconstruido: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    turbiedad: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    clarity: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 3 })
    colorabsorbancia: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colortransmitancia: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorl: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorc: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorh: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colora: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorb: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorl2: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colora2: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    colorb2: number;

    @Column({ nullable: true, })
    colorapariencia: string;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    consistencia5: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    consistencia20: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    consistencia30: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    viscosidadcp: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    viscosidadtorque: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    etanol: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    acidolatico: number;

    @Column({ nullable: true, })
    pruebaorgaolor: string;

    @Column({ nullable: true, })
    pruebaorgasabor: string;

    @Column({ nullable: true, })
    pruebaorgatextura: string;

    @Column({ nullable: true, })
    verificacionpn: string;

    @Column({ nullable: true, })
    testblotter: string;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    porcentajepulpa: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    aerobiosmesofilos: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    aerobiostermofilos: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    coliformestotales: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    coliformesfecales: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    esporas: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    anaerobios: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    lactobacillus: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    moho: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    levaduras: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    mohotermoresistentes: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    salmonella: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    alicyclobacillus: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    listeria: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    conteohoward: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    pseudomonas: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    ecoli: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    tab: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    guayacol: number;

    @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
    psicrofilos: number;

    @ManyToOne(() => Order, { nullable: true })
    @JoinColumn({ name: 'order', referencedColumnName: 'id' })
    orden?: Order;

    @ManyToOne(() => NonConformity, { nullable: true })
    @JoinColumn({ name: 'nonconformity', referencedColumnName: 'id' })
    status?: NonConformity;

    @CreateDateColumn()
    createdat: Date;

    @UpdateDateColumn()
    updatedat: Date;
}