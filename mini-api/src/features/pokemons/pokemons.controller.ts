import { Controller, Get } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PokemonEntity } from '../../entities/pokemon.entity';

@Controller('pokemons')
export class PokemonsController {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: EntityRepository<PokemonEntity>,
  ) {}

  @Get('test')
  async test() {
    const findAllPokemons = await this.pokemonRepository.findAll();
    console.log(findAllPokemons);
    return;
  }
}
