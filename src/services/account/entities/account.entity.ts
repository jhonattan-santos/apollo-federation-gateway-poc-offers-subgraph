import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Account {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @Field((type) => String, { nullable: true })
  agency: string;

  @Field((type) => String, { nullable: true })
  employeeId: string;

  @Field((type) => String, { nullable: true })
  balance: string;

  @Field((type) => Employee, { nullable: true })
  employee: Employee;

  @Field((type) => String, { nullable: true })
  creationDate: Date;
}
