import { Module } from '@nestjs/common';
import { PokeApiModule } from '../../infra/poke-api/poke-api.module';
import { IndexPokemonsCommand } from './index-pokemons.command';
import { PokemonsController } from './pokemons.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonEntity } from '../../entities/pokemon.entity';

@Module({
  imports: [PokeApiModule, MikroOrmModule.forFeature([PokemonEntity])],
  controllers: [PokemonsController],
  providers: [IndexPokemonsCommand],
})
export class PokemonsModule {}
