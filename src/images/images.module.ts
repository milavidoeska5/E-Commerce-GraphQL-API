import { Module, forwardRef } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ProductsModule)],
  providers: [ImagesService, ImagesResolver],
})
export class ImagesModule { }
