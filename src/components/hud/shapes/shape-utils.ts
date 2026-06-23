/**
 * Helpers internos das HUD shapes.
 */

/**
 * Monta o valor de `filter` CSS de uma shape combinando drop-shadow (glow) e
 * ajuste de contraste. Retorna string vazia quando nao ha efeito (sem custo
 * de filtro no render).
 *
 * @param shadow   raio do glow em px (0 = sem glow)
 * @param color    cor do glow
 * @param contrast contraste em % (100 = neutro)
 */
export function makeFilter(shadow: number, color: string, contrast: number): string {
  const parts: string[] = []
  if (shadow) parts.push(`drop-shadow(0px 0px ${shadow}px ${color})`)
  if (contrast !== 100) parts.push(`contrast(${contrast}%)`)
  return parts.join(" ")
}
