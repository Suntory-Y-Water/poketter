'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from './Card';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

export const PokemonLists = () => {
  const [pokemonLists] = useAtom(pokemonListsAtom);
  return (
    <div className='mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {pokemonLists.map((pokemon) => (
          <Link
            target='_blank'
            href={`https://zukan.pokemon.co.jp/detail/${pokemon.id}`}
            key={pokemon.uniqId}
            rel='noopener noreferrer'
          >
            <Card pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
};
