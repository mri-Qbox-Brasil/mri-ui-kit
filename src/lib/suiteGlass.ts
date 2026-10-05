import { startGameGlass, type GameGlassHandle, type GameGlassOptions } from './gameGlass'

/** Superfícies da suíte no tema liquid, mais quem marcar data-glass à mão. */
const SUITE_SELECTOR = ":root[data-theme='liquid'] .mri-surface, [data-glass]"

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
