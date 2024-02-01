import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ArgsType()
export class statusArgs {
    @Field(()=> Boolean,{nullable: true})
    @IsBoolean()
    @IsOptional()
    status: boolean;   
}