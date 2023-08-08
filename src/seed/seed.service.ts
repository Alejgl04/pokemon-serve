import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ name, url }) => {
      const segmentsUrl = url.split('/');
      const no: number = +segmentsUrl[segmentsUrl.length - 2];

      console.log({ name, no });
    });

    return data.results;
  }
}
