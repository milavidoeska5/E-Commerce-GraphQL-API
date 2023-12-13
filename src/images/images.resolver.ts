import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Image } from './image.entity';
import { ImagesService } from './images.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateImageInput } from './dto/update-image.input';
import { CreateImageInput } from './dto/create-image.input';
import { Product } from 'src/products/product.entity';


@Resolver(of => Image)
export class ImagesResolver {
    constructor(private imageService: ImagesService) { }

    @Query(returns => [Image])
    images(): Promise<Image[]> {
        return this.imageService.findAll();
    }

    @Query(returns => Image)
    image(@Args('id', { type: () => String }) id: string): Promise<Image> {
        return this.imageService.findOneById(id);
    }

    @Mutation(returns => Image)
    createImage(@Args('input') createImageInput: CreateImageInput): Promise<Image> {
        return this.imageService.createImage(createImageInput);
    }

    @Mutation(returns => Image)
    async updateImage(
        @Args('id', { type: () => String }) id: string,
        @Args('input') input: UpdateImageInput,
    ): Promise<Image> {
        return this.imageService.updateImage(id, input);
    }

    @Mutation(returns => Image)
    async deleteImage(@Args('id', { type: () => String }) id: string): Promise<Image> {
        const deletedProduct = await this.imageService.remove(id);

        if (!deletedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return deletedProduct;
    }

    @ResolveField(returns => Product)
    product(@Parent() image: Image): Promise<Product> {
        return this.imageService.getProduct(image.productId);
    }
}
