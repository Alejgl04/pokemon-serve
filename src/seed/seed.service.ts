import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segmentsUrl = url.split('/');
      const no: number = +segmentsUrl[segmentsUrl.length - 2];

      pokemonToInsert.push({ name, no });
      // const pokemon = await this.pokemonModel.create({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'seed created';
  }
}
