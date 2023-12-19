'use client';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

export const RefreshButton = ({ names }: PokemonIdProps) => {
  const [pokemon, setPokemon] = useAtom(pokemonListsAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    // ローディング開始
    setIsLoading(true);

    // 10%の確率でドオーだけ表示するAPIを叩く
    if (Math.random() < 0.1) {
      await executeAlternateAction();
    } else {
      await executeOriginalAction();
    }

    setIsLoading(false); // ローディング終了
  };

  const executeOriginalAction = async () => {
    const selectedIds = new Set();
    while (selectedIds.size < 6) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      selectedIds.add(randomName);
    }

    const queryParams = Array.from(selectedIds).join(',');
    const res = await fetch(`api/pokemon?names=${queryParams}`);
    const pokemonData = await res.json();
    setPokemon(pokemonData);
  };

  const executeAlternateAction = async () => {
    const res = await fetch(`api/clodsire`);
    const pokemonData = await res.json();
    setPokemon(pokemonData);
  };

  return (
    <div
      className={`py-4 px-16 font-bold rounded-md text-center ${
        isLoading
          ? 'bg-yellow-500 text-custom-black'
          : 'bg-custom-yellow hover:bg-yellow-500 text-custom-black'
      } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={!isLoading ? handleClick : undefined}
    >
      ランダムにポケモンを選ぶ
    </div>
  );
};
