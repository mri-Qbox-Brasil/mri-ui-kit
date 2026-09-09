import { createElement, isValidElement, type ElementType, type ReactElement, type ReactNode } from 'react'

/**
 * Tipo de icone aceito pelos componentes do kit.
 *
 * Cobre tres casos que `LucideIcon` sozinho nao cobria:
 * - componentes do lucide (`Home`, `Users`, ...);
 * - os SVGs do proprio kit (`MriTeleportIcon` e cia. do MriIcons), que sao
 *   funcoes simples e nao sao assinaveis a `LucideIcon`;
 * - icon fonts, onde o icone e markup e nao componente — passe o elemento
 *   pronto: `icon={<span className="material-symbols-outlined">home</span>}`.
 */
export type MriIconProp = ElementType | ReactElement

/**
 * Renderiza um `MriIconProp` aplicando `className`. Elemento pronto vai
 * embrulhado num `<span>` (que recebe as classes de tamanho/cor); componente e
 * instanciado com a `className` direto.
 */
export function renderMriIcon(icon: MriIconProp | undefined | null, className?: string): ReactNode {
    if (!icon) return null
    if (isValidElement(icon)) return <span className={className}>{icon}</span>
    return createElement(icon as ElementType, { className })
}
