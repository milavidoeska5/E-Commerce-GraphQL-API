import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, MongoRepository } from 'typeorm';
import { ObjectId, UpdateResult } from 'mongodb';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: MongoRepository<Product>) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOneById(id: string): Promise<Product> {
        const objectId = new ObjectId(id);
        const product = await this.productRepository.findOne({ _id: objectId } as any);

        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return product;
    }

    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const newProduct = this.productRepository.create(createProductInput);

        return this.productRepository.save(newProduct);
    }

    async updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
        const objectId = new ObjectId(id);

        const originalProductDocument = await this.productRepository.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'before' },
        );

        if (!originalProductDocument.value) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return originalProductDocument.value;
    }

    async remove(id: string): Promise<Product | null> {
        const productToRemove = await this.productRepository.findOneBy(id);

        if (!productToRemove) {
            return null;
        }

        await this.productRepository.remove(productToRemove);
        return productToRemove;
    }

}
