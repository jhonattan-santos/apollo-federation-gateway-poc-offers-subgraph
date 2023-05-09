import { NotFoundException } from '@nestjs/common';
import { Args, Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { Offers } from './entities/offers.entity';
import { OffersService } from './offers.service';

@Resolver((of) => Offers)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Query((returns) => [Offers])
  async offers(@Args('customerId') customerId: string): Promise<Offers[]> {
    const offer = await this.offersService.findOffersByCustomerId(customerId);
    if (!offer) {
      throw new NotFoundException(customerId);
    }
    return offer;
  }

  @Query((returns) => [Offers])
  async allOffers(): Promise<Offers[]> {
    return await this.offersService.findAllOffers();
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    customerId: string;
  }) {
    const offers = await this.offersService.findOffersByCustomerId(
      reference.customerId,
      );

    if (!offers) {
      throw new NotFoundException(reference.customerId);
    }
    return offers[0];
  }
}
