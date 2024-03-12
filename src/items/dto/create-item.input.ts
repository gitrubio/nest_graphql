import { InputType, Field, Float } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field( ()=> String, {description: 'Name of the item'})
  @IsString()
  name: string;

  @Field(()=> Float)
  @IsInt()
  quantity: number;

  @Field(()=> String, {description: 'Type of quantity', nullable: true, defaultValue: 'units'})
  @IsString()
  @IsOptional()
  quantityType: string;
}
