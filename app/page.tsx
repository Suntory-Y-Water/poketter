import { PokemonLists } from './components/PokemonLists';
import { RefreshButton } from './components/RefreshButton';
import pokemonData from './data/pokemon.json';

export default function Home() {
  // JSONから全てのIDを抽出して配列に格納
  const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center text-base'>
        <div className='w-full'>
          <p>スカーレットバイオレットに内定しているポケモンのみを表示します。</p>
          <p>ポケモンを選択するとポケモン徹底攻略様のページへ移動できます。</p>
        </div>
        <div className='mt-4 sm:mt-0 w-full'>
          <RefreshButton names={pokemonNames} />
        </div>
      </div>
      <div className='my-8'>
        <PokemonLists />
      </div>
    </div>
  );
}
