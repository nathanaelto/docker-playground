import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'pokemons',
})
export class PokemonEntity {
  @PrimaryKey()
  id: number;

  @Property({
    type: 'varchar',
    length: 200,
    index: true,
  })
  name: string;

  @Property({
    type: 'array',
  })
  types: string[];

  @Property({
    type: 'text',
  })
  image: string;
}
