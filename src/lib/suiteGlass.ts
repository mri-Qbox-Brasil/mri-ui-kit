import { startGameGlass, type GameGlassHandle, type GameGlassOptions } from './gameGlass'

/**
 * Top-level suite surfaces in the liquid theme, plus anything marked data-glass by hand.
 * A surface inside another one is skipped: the glass only clips to the first overflow
 * parent, so a nested tile scrolled out of a list would be drawn outside the panel.
 */
const SUITE_SELECTOR = ":root[data-theme='liquid'] .mri-surface:not(.mri-surface .mri-surface), [data-glass]"

/**
 * startSuiteGlass — liga o vidro do jogo conforme o tema da suíte (data-theme no <html>).
 *
 * Chame uma vez no boot da NUI. Com o tema `liquid`, toda `.mri-surface` ganha o jogo
 * desfocado atrás; nos outros temas só os elementos com `data-glass`. Trocar o tema no
 * /uiconfig liga e desliga na hora. Sem elemento visível o loop fica parado.
 *
 * Não marque como `mri-surface` tela que fica aberta o tempo todo (HUD): cada página com
 * vidro visível desenha a cada frame.
 */
export function startSuiteGlass(options: Omit<GameGlassOptions, 'selector'> = {}): GameGlassHandle {
  const glass = startGameGlass({ ...options, selector: SUITE_SELECTOR })
  // O startGameGlass só observa o <body>; o tema muda no <html>.
  const observer = new MutationObserver(() => glass.refresh())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  return {
    refresh: glass.refresh,
    stop: () => {
      observer.disconnect()
      glass.stop()
    },
  }
}
