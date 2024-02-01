import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {name: 'Saludo'})
    helloWorld(): string {
        return 'Hello World!';
    }
   
    @Query(() => Float, {name: 'Random_number'})
    random(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, {name: 'randomFromZeroTo'})
    getRandomFromZeroTo( 
        @Args('to',{type:() => Int ,nullable: true}) to: number = 100 
        ): number {
        return Math.floor(Math.random() * to);
    }
}
