import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType({description : "Todo quick aggregation type"})
export class AggregationsType {
    @Field(() => Int)
    total: number;
    @Field(() => Int)
    pending: number;
    @Field(() => Int)
    completed: number;
}