import React from 'react';
import Image from 'next/image';

type PokemonCardProps = {
  pokemon: PokemonData;
};

export const Card = ({ pokemon }: PokemonCardProps) => {
  const imageUrl = pokemon.image || '/monster-ball.png';
  return (
    <div
      className='bg-custom-white hover:bg-gray-200 text-custom-black aspect-square p-4 rounded-md shadow-md flex-col items-center justify-center'
      key={pokemon.name}
    >
      <Image src={imageUrl} alt='Pokemon image' width={475} height={475} priority />
      <p className='px-2 font-medium md:text-xl text-custom-gray'>{pokemon.japaneseName}</p>
    </div>
  );
};
