import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const pokemonData = {
    name: 'clodsire',
    japaneseName: 'ドオー',
  };

  // APIからポケモンのデータを取得
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  // IDと画像URLを取得
  const pokemonId = data.species.url.match(/\/(\d{1,4})\/$/)[1];
  const image = data.sprites.other['official-artwork'].front_default;
  const shinyImage = data.sprites.other['official-artwork'].front_shiny;

  const resData = Array.from({ length: 6 }).map(() => {
    // 10%の確率で光る画像を選択
    const shinyFlag = Math.random() < 0.1;

    return {
      uniqId: crypto.randomUUID(),
      id: pokemonId,
      name: data.name,
      japaneseName: pokemonData.japaneseName,
      image: shinyFlag ? shinyImage : image,
    };
  });

  return NextResponse.json(resData, { status: 200 });
}
