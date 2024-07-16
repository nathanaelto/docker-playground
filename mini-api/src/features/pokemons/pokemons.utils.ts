import { PokemonResponse } from '../../infra/poke-api/types/pokemon-response';
import { PokemonDto } from './dto/pokemon.dto';

export const pokemonResponseToDto = (
  pokemonResponse: PokemonResponse,
): PokemonDto => {
  return {
    id: pokemonResponse.id,
    name: pokemonResponse.name,
    types: pokemonResponse.types.map((typeSlot) => typeSlot.type.name),
    image: pokemonResponse.sprites.front_default,
  };
};
