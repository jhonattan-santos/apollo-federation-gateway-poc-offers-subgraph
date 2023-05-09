import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "customerId")')
export class Offers {
  @Field((type) => ID, { nullable: true })
  id: string;
  
  @Field((type) => String, { nullable: true })
  name: string;
  
  @Field((type) => ID, { nullable: true })
  customerId: string;
  
  @Field((type) => String, { nullable: true })
  creationDate: Date;
}
