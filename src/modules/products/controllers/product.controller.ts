import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductDto, UpdateProductDto } from '../dto/product.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Productos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':code')
  getOneProduct(@Param('code') id: string) {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Put(':code')
  updateProduct(
    @Param('code') code: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productService.updateProduct(code, product);
  }

  @Delete(':code')
  deleteProduct(@Param('code') code: string) {
    return this.productService.deleteProduct(code);
  }
}
