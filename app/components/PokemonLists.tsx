'use client';
import React from 'react';
import { Card } from './Card';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

export const PokemonLists = () => {
  const [pokemonLists] = useAtom(pokemonListsAtom);

  return (
    <div className='px-8 mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Link href={'/'}>
          <Card />
        </Link>
      </div>
    </div>
  );
};
