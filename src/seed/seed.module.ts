import { Module } from '@nestjs/common';
import { PokemonModule } from '../pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [PokemonModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
