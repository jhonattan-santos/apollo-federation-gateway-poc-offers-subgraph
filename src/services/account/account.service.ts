import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Account } from './entities/account.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly httpService: HttpService) {}

  baseURL = 'http://localhost:4001';

  async findAccountById(id: string): Promise<Account[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Account[]>(`${this.baseURL}/accounts?id=${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllAccounts(): Promise<Account[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Account[]>(`${this.baseURL}/accounts`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
