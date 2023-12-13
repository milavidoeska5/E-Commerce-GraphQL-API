import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, ProductsResolver],
  exports: [ProductsService]
})
export class ProductsModule {}
