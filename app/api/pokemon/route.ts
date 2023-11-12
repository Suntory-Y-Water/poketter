import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises'; // 非同期版のfsモジュールをインポート

export async function GET(req: NextRequest, res: NextApiResponse) {
  // URLSearchParamsを使用してクエリパラメータを解析
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const idsParam = searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({ error: 'IDが存在しません' }, { status: 400 });
  }

  const ids = idsParam.split(',');

  // pokemon.jsonからポケモンのデータを読み込む
  const pokemonDataFromFile: PokemonData[] = JSON.parse(
    await fs.readFile('app/data/pokemon.json', 'utf-8'),
  );

  // 各IDに対応するポケモンデータを非同期で取得
  const pokemonDataPromises = ids.map(async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-store' });
    const data = await response.json();

    // 英名に対応する日本語名を検索
    const japaneseNameEntry = pokemonDataFromFile.find((p) => p.name === data.name);

    return {
      id: data.id,
      name: data.name,
      japaneseName: japaneseNameEntry ? japaneseNameEntry.japaneseName : data.name,
      image: data.sprites.other['official-artwork'].front_default,
    };
  });

  // すべてのデータを待機
  const pokemonLists = await Promise.all(pokemonDataPromises);
  return NextResponse.json(pokemonLists, { status: 200 });
}
