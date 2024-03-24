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
  ) { }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProduct(code: string) {
    const product = await this.productRepository.findOneBy({ code });
    if (product) {
      return { success: true, data: product }
    }
    return { success: false, message: "No existe producto" }
  }

  async createProduct(product: ProductDto) {
    const productFind = await this.getProduct(product.code);
    if (!productFind.success) {
      const productSave = await this.productRepository.save(product);
      return { success: true, data: productSave };
    }
    return { success: false, message: "Producto ya existe" };
  }

  async updateProduct(code: string, product: UpdateProductDto): Promise<any> {
    const productFind = await this.getProduct(code);
    const productNew = await this.getProduct(product.code);
    const existDetails = await this.orderService.getDetailsByProduct(code);

    if (product.characteristiclote && existDetails.length > 0) {
      return { success: false, message: 'no updated lote tamanio' };
    }
    if (productFind && (!productNew || productFind.data.code == productNew.data.code)) {
      await this.productRepository.update(productFind.data.code, product);
      return { success: true, data: product };
    }
    return { success: false, message: "Producto no actualizado" };
  }

  async deleteProduct(code: string): Promise<any> {
    try {
      const productFind = await this.getProduct(code);
      if (productFind) {
        await this.productRepository.delete(code);
        return { success: true, message: 'Producto eliminado correctamente' };
      }
      return {
        success: false,
        message: 'El producto que desea eliminar no existe',
      };
    } catch (error) {
      return {
        success: false,
        message: 'El producto no se puede eliminar ya contiene ordenes',
      };
    }
  }
}
