import { PokemonLists } from './components/PokemonLists';
import { RefreshButton } from './components/RefreshButton';
import pokemonData from './data/pokemon.json';

export default function Home() {
  // JSONから全てのIDを抽出して配列に格納
  const pokemonIds = pokemonData.map((pokemon) => pokemon.id);
  return (
    <div>
      <div className='flex'>
        <p>内定しているポケモンのみを表示します。</p>
        <p>ポケモンを選択するとポケモン徹底攻略様のページへ移動できます。</p>
        <div className='flex'>
          <RefreshButton ids={pokemonIds} />
        </div>
      </div>
      <div className='my-8'>
        <PokemonLists />
      </div>
    </div>
  );
}
