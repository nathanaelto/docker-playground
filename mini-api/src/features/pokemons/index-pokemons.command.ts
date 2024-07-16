import { Command, CommandRunner } from 'nest-commander';
import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PokeApiService } from '../../infra/poke-api/poke-api.service';
import { pokemonResponseToDto } from './pokemons.utils';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PokemonEntity } from '../../entities/pokemon.entity';
import { EntityRepository } from '@mikro-orm/core';
import type { Primary } from '@mikro-orm/core/typings';

@Command({
  name: 'pokemons:index',
  description: 'Index pokemons in search engine',
})
export class IndexPokemonsCommand extends CommandRunner {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly pokeApiService: PokeApiService,
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: EntityRepository<PokemonEntity>,
  ) {
    super();
  }

  async run(): Promise<void> {
    this.logger.log('Indexing pokemons');
    const pokemonsResponses = await this.pokeApiService.fetchPokemons();
    this.logger.log(`Pokemons fetched: ${pokemonsResponses.length}`);

    const pokemonsDto = pokemonsResponses.map(pokemonResponseToDto);

    try {
      await this.pokemonRepository.insertMany(pokemonsDto);
    } catch (e) {
      this.logger.error(`Error when insertions : ${e}`);
      return;
    }

    this.logger.log(`Insertions successful`);
  }
}
