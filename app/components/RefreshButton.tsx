'use client';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { pokemonListsAtom } from '../state/atoms';

export const RefreshButton = ({ names }: PokemonIdProps) => {
  const [pokemon, setPokemon] = useAtom(pokemonListsAtom);

  const handleClick = async () => {
    // 10%の確率でドオーだけ表示するAPIを叩く
    if (Math.random() < 0.1) {
      await executeAlternateAction();
    } else {
      await executeOriginalAction();
    }
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
      className='bg-custom-yellow hover:bg-yellow-300 text-custom-black py-4 px-16 font-bold rounded-md cursor-pointer text-center'
      onClick={handleClick}
    >
      ランダムにポケモンを選ぶ
    </div>
  );
};
