import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokemonResponse>(
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
