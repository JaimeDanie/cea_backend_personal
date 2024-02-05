import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto, UpdateProductDto } from '../dto/product.entity';
import { OrderService } from 'src/modules/order/services/order.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProduct(code: string): Promise<Product> {
    return this.productRepository.findOneBy({ code });
  }

  async createProduct(product: ProductDto): Promise<Product> {
    const productFind = await this.getProduct(product.code);
    if (!productFind) {
      return this.productRepository.save(product);
    }
    return null;
  }

  async updateProduct(code: string, product: UpdateProductDto): Promise<any> {
    const productFind = await this.getProduct(code);
    const productNew = await this.getProduct(product.code);
    const existDetails = await this.orderService.getDetailsByProduct(code);

    if (product.characteristiclote && existDetails.length > 0) {
      return { success: false, message: 'no updated lote tamanio' };
    }
    if (productFind && (!productNew || productFind.code == productNew.code)) {
      await this.productRepository.update(productFind.code, product);
      return product;
    }
    return null;
  }

  async deleteProduct(code: string): Promise<Product> {
    const productFind = await this.getProduct(code);
    if (productFind) {
      this.productRepository.delete(code);
    }
    return null;
  }
}
