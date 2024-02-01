import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsInt, Min, IsOptional } from "class-validator";

@InputType()
export class UpdateTodoInput {
    @Field(() => Int)
    @IsInt({message : "Id must be integer"})
    @Min(1)
    id: number;

    @Field(() => String)
    @MaxLength(10, {message : "Title must be less than 20 characters"})
    title?: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    @MaxLength(20, {message : "Description must be less than 20 characters"})
    description?: string;

    @Field(() => Boolean)
    @IsBoolean({message : "Done must be boolean"})
    done: boolean = false;
}