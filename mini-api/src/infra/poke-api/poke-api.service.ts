import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonResponse } from './types/pokemon-response';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PokeApiService {
  private readonly pokemonEndpoint = 'pokemon';
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  async fetchPokemons(): Promise<PokemonResponse[]> {
    const ids = Array.from({ length: 1008 }, (_, i) => i + 1);
    return Promise.all(
      ids.map(async (i): Promise<PokemonResponse> => {
        const { data } = await firstValueFrom(
          this.httpService.get<PokemonResponse>(`${this.pokemonEndpoint}/${i}`),
        );
        return {
          id: data.id,
          name: data.name,
          types: data.types,
          sprites: { front_default: data.sprites.front_default },
        };
      }),
    );
  }
}
