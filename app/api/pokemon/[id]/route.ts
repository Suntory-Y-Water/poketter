import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: NextApiResponse) {
  const id = req.url.split('/pokemon/')[1];
  const POKE_API_URL = process.env.POKE_API_URL;
  const getPokemonData = await fetch(`${POKE_API_URL}/${id}`);
  const pokemonData = await getPokemonData.json();

  if (!pokemonData) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }
  const pokemonLists: PokemonListsType = {
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork'].front_default,
  };
  return NextResponse.json(pokemonLists, { status: 200 });
}
