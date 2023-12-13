import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { MongoRepository, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.entity';


@Injectable()
export class ImagesService {
    constructor(@InjectRepository(Image) private imageRepository: MongoRepository<Image>,@Inject(forwardRef(() => ProductsService))
    private productService: ProductsService) { }

    async findAll(): Promise<Image[]> {
        return this.imageRepository.find();
    }

    async findOneById(id: string): Promise<Image> {
        const objectId = new ObjectId(id);
        const image = await this.imageRepository.findOne({ _id: objectId } as any);

        if (!image) {
            throw new NotFoundException(`Image with id ${id} not found`);
        }

        return image;
    }

    async createImage(createImageInput: CreateImageInput): Promise<Image> {
        const newImage = this.imageRepository.create(createImageInput);

        return this.imageRepository.save(newImage);
    }

    async updateImage(id: string, input: UpdateImageInput): Promise<Image> {
        const objectId = new ObjectId(id);

        const originalImageDocument = await this.imageRepository.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'before' },
        );

        if (!originalImageDocument.value) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return originalImageDocument.value;
    }

    async remove(id: string): Promise<Image | null> {
        const imageToRemove = await this.imageRepository.findOneBy(id);

        if (!imageToRemove) {
            return null;
        }

        await this.imageRepository.remove(imageToRemove);
        return imageToRemove;
    }

    async getProduct(productId: string): Promise<Product> {
        return this.productService.findOneById(productId);
    }

}
