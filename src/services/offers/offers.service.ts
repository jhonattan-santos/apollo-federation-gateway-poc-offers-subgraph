import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Offers } from './entities/offers.entity';
import { ResolveReference } from '@nestjs/graphql';

@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);

  constructor(private readonly httpService: HttpService) {}

  baseURL = 'http://localhost:4001';

  async findOffersByCustomerId(customerId: string): Promise<Offers[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Offers[]>(`${this.baseURL}/offers?customerId=${customerId}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findAllOffers(): Promise<Offers[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Offers[]>(`${this.baseURL}/offers`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    customerId: string;
  }) {
    console.log("[REF]", reference)
    const { data } = await firstValueFrom(
      this.httpService
        .get<Offers[]>(
          `${this.baseURL}/offers?customerId=${reference.customerId}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
