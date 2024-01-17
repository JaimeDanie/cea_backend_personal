import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/user/entities/role.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Permission } from 'src/modules/user/entities/permission.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Filler } from 'src/modules/filler/entities/filler.entities';
import { Tubular } from 'src/modules/tubular/entities/tubular.entity';
import { FillingCamera } from 'src/modules/filling-camera/entities/filling-camera.entity';
import { NonConformity } from 'src/modules/non-conformity/entities/NonConformity.entity';
import { Operate } from 'src/modules/operate/entities/operate.entity';
import { OrderDetail } from 'src/modules/order/entities/order-detail.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  requestTimeout: 30000,
  connectionTimeout: 30000,
  synchronize: false,
  entities: [
    User,
    Role,
    Order,
    Permission,
    Product,
    Filler,
    Tubular,
    FillingCamera,
    NonConformity,
    Operate,
    OrderDetail,
  ],
  migrations: ['src/config/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  options: {
    encrypt: false,
    cancelTimeout: 30000,
    connectTimeout: 30000,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
