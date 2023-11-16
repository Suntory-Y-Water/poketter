import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import pokemonData from '../../data/pokemon.json';

export async function GET(req: NextRequest, res: NextApiResponse) {
  // URLSearchParamsを使用してクエリパラメータを解析
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const namesParam = searchParams.get('names');

  if (!namesParam) {
    return NextResponse.json({ error: 'IDが存在しません' }, { status: 400 });
  }

  const names = namesParam.split(',');

  // 各IDに対応するポケモンデータを非同期で取得
  const pokemonDataPromises = names.map(async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      cache: 'no-store',
    });
    const data = await response.json();

    // pokemonのIDから図鑑番号を取得
    const pokemonId = data.species.url.match(/\/(\d{1,4})\/$/)[1];

    // 英名に対応する日本語名を検索
    const japaneseNameEntry = pokemonData.find((p) => p.name === data.name);

    return {
      uniqId: crypto.randomUUID(),
      id: pokemonId,
      name: data.name,
      japaneseName: japaneseNameEntry ? japaneseNameEntry.japaneseName : data.name,
      image: data.sprites.other['official-artwork'].front_default,
    };
  });

  // すべてのデータを待機してからレスポンスを返す
  const pokemonLists = await Promise.all(pokemonDataPromises);
  return NextResponse.json(pokemonLists, { status: 200 });
}
