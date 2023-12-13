import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(of => Product)
export class ProductsResolver {
    constructor(private productService: ProductsService) { }

    @Query(returns => [Product])
    products(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Query(returns => Product)
    product(@Args('id', { type: () => String }) id: string): Promise<Product> {
        return this.productService.findOneById(id);
    }

    @Mutation(returns => Product)
    createProduct(@Args('input') createProductInput: CreateProductInput): Promise<Product> {
        return this.productService.createProduct(createProductInput);
    }

    @Mutation(returns => Product)
    async updateProduct(
        @Args('id', { type: () => String }) id: string,
        @Args('input') input: UpdateProductInput,
    ): Promise<Product> {
        return this.productService.updateProduct(id, input);
    }

    @Mutation(returns => Product)
    async deleteProduct(@Args('id', { type: () => String }) id: string): Promise<Product> {
        const deletedProduct = await this.productService.remove(id);

        if (!deletedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return deletedProduct;
    }


}
