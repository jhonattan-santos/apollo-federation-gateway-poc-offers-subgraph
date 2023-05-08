import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { Employee } from './entities/employee.entity';

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query((returns) => [Account])
  async account(@Args('id') id: string): Promise<Account[]> {
    const account = await this.accountService.findAccountById(id);
    if (!account) {
      throw new NotFoundException(id);
    }
    return account;
  }

  @Query((returns) => [Account])
  async accounts(): Promise<Account[]> {
    return await this.accountService.findAllAccounts();
  }

  @ResolveField('employee')
  employee(@Parent() account: Account) {
    return { __typename: 'Employee', id: account.employeeId };
  }
}
