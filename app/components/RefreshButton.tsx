'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

export const RefreshButton = ({ names }: PokemonIdProps) => {
  const [pokemon, setPokemon] = useAtom(pokemonListsAtom);

  const handleClick = async () => {
    // ids 配列からランダムに6つのIDを選択
    const selectedIds = [];
    for (let i = 0; i < 6; i++) {
      selectedIds.push(names[Math.floor(Math.random() * names.length)]);
    }

    // 選択されたIDをクエリパラメータとして連結
    const queryParams = selectedIds.join(',');

    const res = await fetch(`http://localhost:3000/api/pokemon?names=${queryParams}`);
    const pokemonData = await res.json();
    setPokemon(pokemonData);
  };

  return (
    <div
      className='bg-custom-yellow hover:bg-yellow-300 text-custom-black py-4 px-16 font-bold rounded-md cursor-pointer text-center'
      onClick={handleClick}
    >
      ランダムにポケモンを選ぶ
    </div>
  );
};
