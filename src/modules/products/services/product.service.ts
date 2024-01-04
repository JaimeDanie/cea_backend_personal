import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from '../dto/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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

  async updateProduct(code: string, product: ProductDto): Promise<Product> {
    const productFind = await this.getProduct(code);
    const productNew = await this.getProduct(product.code);
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
