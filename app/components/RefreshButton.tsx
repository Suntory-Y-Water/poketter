'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

type PokemonIdProps = {
  ids: string[];
};

export const RefreshButton = ({ ids }: PokemonIdProps) => {
  const [pokemon, setPokemon] = useAtom(pokemonListsAtom);

  const handleClick = async () => {
    // propsとして受け取った配列からランダムに一つのIDを選択
    const randomPokemonId = ids[Math.floor(Math.random() * ids.length)];

    // 取得したIDEAを元にAPIを実行し、ポケモンの情報を取得
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/pokemon/${999}`);
    const pokemonData = await res.json();
    setPokemon(pokemonData);
  };

  return (
    <div
      className='bg-custom-yellow hover:bg-yellow-300 text-custom-black p-4 font-bold rounded-md cursor-pointer'
      onClick={handleClick}
    >
      ランダムにポケモンを選ぶ
    </div>
  );
};
