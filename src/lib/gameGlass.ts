/**
 * gameGlass: "liquid glass" na NUI do FiveM, o jogo desfocado (e refratado na borda) atrás
 * dos elementos marcados com `data-glass`.
 *
 * O núcleo é o pacote público `mri-fivem-liquid-glass` (github.com/mur4i/mri-fivem-liquid-glass):
 * correção e melhoria vão lá, o kit só reexporta. Marcação, opções e limites no README dele.
 */
export { startGameGlass } from 'mri-fivem-liquid-glass'
export type { GameGlassHandle, GameGlassOptions } from 'mri-fivem-liquid-glass'
