import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsInt } from "class-validator";

@InputType()
export class CreateTodoInput {
    @Field(() => Int)
    @IsInt({message : "Id must be integer"})
    id: number;

    @Field(() => String)
    @IsString({message : "Title must be string"})
    @IsNotEmpty({message : "Title must not be empty"})
    @MaxLength(10, {message : "Title must be less than 20 characters"})
    title: string;

    @Field(() => String)
    
    @IsString({message : "Description must be string"})
    @IsNotEmpty({message : "Description must not be empty"})
    @MaxLength(20, {message : "Description must be less than 20 characters"})
    description: string;

    @Field(() => Boolean)
    @IsBoolean({message : "Done must be boolean"})
    done: boolean = false;
}