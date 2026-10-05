# Tema da suíte MRI: guia de adaptação de resource

Checklist para deixar a NUI de um resource seguindo o tema da suíte MRI: cores,
fonte, radius, cores de status, tema dark/glass e opacidade, tudo controlado pelo
painel `/adminui` (`/uiconfig`) do ox_lib e pelas convars da suíte, ao vivo.

Referências já migradas:

| Resource | Quando usar como exemplo |
|---|---|
| `mri_Qadmin` | NUI React com Tailwind (a maioria) |
| `ox_inventory` | NUI com CSS/SCSS próprio, sem Tailwind |
| `ox_lib` | dono do `/uiconfig`; mostra o lado Lua do config |

O funcionamento detalhado está em `src/stories/Theming.mdx` (Storybook).

## 1. De onde vem cada coisa

| O que | Fonte | Atualiza ao vivo por |
|---|---|---|
| Cor de destaque (accent) | convar `mri:color` | `AddConvarChangeListener` no server do resource |
| Cor de fundo | convar `mri:backgroundColor` (`''` = padrão `#09090B`) | idem |
| Tema, fonte, radius, cores de status, opacidade, dimensões, overrides de accent/fundo | `/uiconfig` do ox_lib: `lib.callback.await('ox_lib:getUiConfig')` | net event `ox_lib:uiConfigChanged` |

O `/uiconfig` manda `theme` (`'dark' \| 'glass'`), `opacity` (0.3 a 1, opacidade real
de painéis e cards em qualquer tema), `fontFamily`, `radius`, `successColor`,
`warningColor`, `errorColor`, `accentColor`/`backgroundColor` (override, vazio = segue
a convar) e dimensões. O padrão MRI é glass com opacidade 0.8.

## 2. Dependência e CSS

```bash
pnpm add @mriqbox/ui-kit@latest   # ou npm install
```

**Com Tailwind:**

```js
// tailwind.config.(js|cjs)
module.exports = {
  presets: [require('@mriqbox/ui-kit/tailwind-preset')],
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@mriqbox/ui-kit/dist/**/*.{js,mjs}'],
  // theme.extend só com o que for realmente do resource
};
```

```ts
// main.tsx
import '@mriqbox/ui-kit/dist/style.css';
```

Apague a cópia local das cores (`colors: { background: 'hsl(var(--background))', ... }`):
o preset já traz `background`, `card` e `border` cientes da opacidade e do glass.

**Sem Tailwind (CSS/SCSS próprio):**

```ts
import '@mriqbox/ui-kit/themes.css';
```

Não importe o `dist/style.css` nesse caso: ele traz o reset do Tailwind. O
`themes.css` já carrega as fontes (seção 7).

## 3. Só tokens, nunca cor fixa

Tailwind: `bg-background`, `bg-card`, `bg-popover`, `bg-secondary`, `bg-muted`,
`text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`,
`text-primary`, `ring-ring`. Status (cores do `/uiconfig`): `text-success`,
`bg-warning/10`, `border-error/30` e afins.

CSS próprio:

```scss
$card:  hsl(var(--card) / var(--ui-surface-alpha-card, 1));
$panel: hsl(var(--popover) / var(--ui-surface-alpha-card, 1));
$bg:    hsl(var(--background) / var(--ui-surface-alpha, 1));
$line:  hsl(var(--ui-border-hsl, var(--border)) / var(--ui-border-alpha, 1));
$text:  hsl(var(--foreground));
$accent: hsl(var(--primary));
```

Status: `var(--ui-success)`, `var(--ui-warning)`, `var(--ui-error)`; com
transparência, `rgb(var(--ui-error-rgb) / 0.1)` (o CEF 103 não tem `color-mix`).
O `themes.css` traz os valores padrão; não declare `--ui-*` no resource. Radius:
`var(--radius)`. Fonte: `var(--ui-font-family, 'Saira', ui-sans-serif, sans-serif)`.

Proibido: `#hex`, `rgba(...)`, `bg-zinc-*`, `bg-neutral-*`, `text-white`,
`bg-black/..` para superfícies, texto ou borda. Transparência para cor de tema usa
`hsl(var(--x) / alpha)`.

Conteúdo sobre `bg-primary` usa `text-primary-foreground`, que o kit escurece quando
o accent é claro. Toggle é o `MriSwitch` (ou `MriSettingToggle`): o knob ligado segue
`--ui-switch-knob-on`, escuro com accent branco/claro. Toggle próprio com knob `bg-white`
fixo sobre `bg-primary` vira um bloco branco com accent branco; troque pelo `MriSwitch`
ou pinte o knob com `hsl(var(--ui-switch-knob-on))`.

Arredondamento só pela escala do preset (`rounded`, `rounded-sm` até `rounded-3xl`,
todos seguindo o `--radius`) ou `rounded-full`. Nada de `rounded-[12px]` nem
`border-radius` fixo no CSS: não muda com o slider do `/uiconfig`.

## 4. Glass: marque as superfícies

| Classe | Onde |
|---|---|
| `mri-surface` | janela/painel principal, modal, tooltip, menu flutuante |
| `mri-surface-card` | blocos de conteúdo: cards, seções, slots |

Uma superfície por área: cada `bg-background`/`bg-card` empilhado multiplica a
opacidade (três camadas a 0.7 dão ~97% opaco e o glass some). O `MriDashboardLayout`
não pinta fundo; a superfície é o `MriTabletFrame` ou, num plugin do Qadmin, o host.
Não ponha `bg-background` em wrappers entre eles.

Não marque inputs, linhas de lista/tabela, badges, chips, toggles. Os componentes
`MriCard`, `MriModal`/`MriDialog`, `MriDrawer`, `MriActionCard`, `MriEconomyCard` e
`MriTabletFrame` já vêm marcados.

Armadilhas já vividas:

- O reflexo é `background-image`. Elemento cujo `background-image` é a imagem de
  um item não pode ter a classe: ponha a imagem num filho.
- Regras `background-size`/`background-position`/`background-repeat` que sobraram
  no elemento marcado espremem o reflexo numa faixa. Remova.
- Sem `backdrop-filter`: na NUI o blur compõe contra a própria página e vira
  camada sólida.
- `box-shadow` do elemento marcado é substituído no glass (soma só as sombras do
  Tailwind via `--tw-shadow`).

### Blur do jogo atrás da superfície (`startGameGlass`)

Pra ver o jogo desfocado atrás do vidro, chame `startGameGlass()` uma vez no boot da NUI
e marque o elemento com `data-glass` (fosco) ou `data-glass="liquid"` (borda em bisel que
refrata o fundo, separação de cor e brilho). O jogo entra como textura WebGL pelo hook da
cfx e é desenhado num canvas atrás da UI, no formato do elemento. O núcleo vem do pacote
público [`mri-fivem-liquid-glass`](https://github.com/mur4i/mri-fivem-liquid-glass), que o
kit reexporta (log no jogo com o prefixo `[liquid-glass]`).

- `html`, `body` e root transparentes; o root acima do canvas (`position: relative;
  z-index: 1`).
- A cor e a opacidade da superfície viram a tinta por cima do blur: mantenha baixas.
- Fora do jogo só liga com `fallbackImage` (dev). Story: `Lib/GameGlass`.
- Ajuste fino por elemento: `data-glass-bezel`, `data-glass-refraction` (px),
  `data-glass-dispersion`, `data-glass-specular` (0..1). Saída: `data-glass-backdrop`
  (`bright`/`dark`) pra trocar a cor do texto.

### Tema `liquid` da suíte (`startSuiteGlass`)

Com `data-theme='liquid'` no `<html>` (escolhido no `/uiconfig` ou pelo jogador), toda
`.mri-surface` vira vidro fosco com o jogo desfocado atrás. Basta chamar uma vez no boot:

```ts
import { startSuiteGlass } from '@mriqbox/ui-kit';

startSuiteGlass();
```

- Liga e desliga sozinho quando o tema muda; nos outros temas só vale o `data-glass` marcado à mão.
- Só a superfície de topo ganha o vidro: `.mri-surface` dentro de outra (ícone, tile) fica de fora.
- A tinta do painel é a opacidade do `/uiconfig` vezes 0.4 (vezes 0.6 nos cards); inputs e
  linhas dentro dele voltam à opacidade normal.
- Mesmo cuidado do `startGameGlass`: root acima do canvas, `html` e `body` transparentes.
- Não marque como `mri-surface` tela que fica aberta o tempo todo (HUD): cada página com vidro
  visível desenha a cada frame.
- Stories: `Lib/GameGlass` > `Suite Liquid` e `Suite Glass` (o botão alterna o tema).

## 5. Accent e fundo (convars)

```ts
import { isHexColor, setSuiteAccent, setSuiteBackground } from '@mriqbox/ui-kit';

// boot (NUI callback que devolve as convars)
fetchNui('getConfig').then((data) => {
  if (isHexColor(data?.accentColor)) setSuiteAccent(data.accentColor);
  setSuiteBackground(data?.backgroundColor);
});
useNuiEvent('updateAccentColor', (d) => isHexColor(d?.accentColor) && setSuiteAccent(d.accentColor));
useNuiEvent('updateBackgroundColor', (d) => setSuiteBackground(d?.backgroundColor));
```

Apague cópias locais de `applyAccentColor`, `applyBackgroundColor`, `hexToHsl` e
afins. Fundo vazio vira `#09090B`, derivado pela mesma conta da suíte inteira.

Lua (client), no padrão dos resources MRI:

```lua
RegisterNUICallback('getConfig', function(_, cb)
    cb({ accentColor = GetConvar('mri:color', '#00E699'), backgroundColor = GetConvar('mri:backgroundColor', '') })
end)
RegisterNetEvent('<resource>:accentColorChanged', function(color)
    SendNUIMessage({ action = 'updateAccentColor', data = { accentColor = color } })
end)
RegisterNetEvent('<resource>:backgroundColorChanged', function(color)
    SendNUIMessage({ action = 'updateBackgroundColor', data = { backgroundColor = color or '' } })
end)
```

Lua (server):

```lua
AddConvarChangeListener('mri:color', function(name)
    if name ~= 'mri:color' then return end
    local color = GetConvar('mri:color', '#00E699')
    if not color:match('^#%x%x%x%x%x%x$') then return end
    TriggerClientEvent('<resource>:accentColorChanged', -1, color)
end)
AddConvarChangeListener('mri:backgroundColor', function(name)
    if name ~= 'mri:backgroundColor' then return end
    local color = GetConvar('mri:backgroundColor', '')
    if color ~= '' and not color:match('^#%x%x%x%x%x%x$') then return end
    TriggerClientEvent('<resource>:backgroundColorChanged', -1, color)
end)
```

## 6. `/uiconfig` do ox_lib

Lua (client), sem dependência do ox_lib: pergunta pelo export `getUiConfig` só se
ele estiver rodando, e ouve o net event que o ox_lib já manda pra todo mundo.

```lua
RegisterNUICallback('getUiConfig', function(_, cb)
    if GetResourceState('ox_lib') ~= 'started' then return cb(false) end
    local ok, cfg = pcall(function() return exports.ox_lib:getUiConfig() end)
    cb(ok and type(cfg) == 'table' and cfg or false)
end)
RegisterNetEvent('ox_lib:uiConfigChanged', function(cfg)
    if type(cfg) ~= 'table' then return end
    SendNUIMessage({ action = 'applyUiConfig', data = cfg })
end)
```

Callback separado do `getConfig`: se o ox_lib não responder, as cores continuam
chegando. Nunca `cb(nil)`.

Não carregue `@ox_lib/init.lua` só pra isso: ele exige `lua54 'yes'` no
`fxmanifest.lua` e aborta sem ele ("Lua 5.4 must be enabled"), erro que só
aparece no jogo, nunca no navegador. Resource que já usa o `lib` (os `ox_*`)
pode usar `lib.callback.await('ox_lib:getUiConfig', false)`.

NUI:

```ts
import { applyUiConfig, setAccentOverride, setBackgroundOverride, type MriUiConfig } from '@mriqbox/ui-kit';

type SuiteUiConfig = MriUiConfig & { theme?: string; accentColor?: string; backgroundColor?: string };

export function applySuiteUiConfig(cfg: SuiteUiConfig | null | undefined) {
  if (!cfg || typeof cfg !== 'object') return;
  applyUiConfig(cfg);
  setAccentOverride(cfg.accentColor);
  setBackgroundOverride(cfg.backgroundColor);
  document.documentElement.setAttribute('data-theme', cfg.theme === 'glass' || cfg.theme === 'liquid' ? cfg.theme : 'dark');
}

fetchNui<SuiteUiConfig>('getUiConfig').then(applySuiteUiConfig);
useNuiEvent<SuiteUiConfig>('applyUiConfig', applySuiteUiConfig);
```

Payload sempre dentro de `data` quando o `useNuiEvent` do resource lê `event.data.data`.

## 7. Fonte

O resource não carrega fonte. O `themes.css` do kit pré-carrega Saira, Inter,
Roboto, Poppins e Montserrat, e qualquer outra família do Google Fonts escolhida
no `/uiconfig` é baixada na hora pelo `applyUiConfig` (`loadGoogleFont`), sem
rebuild. O resource só usa `var(--ui-font-family, 'Saira', ui-sans-serif,
sans-serif)`, e a fonte troca em toda a suíte ao mesmo tempo. Resource com
`applyUiConfig` próprio (não o do kit) chama `loadGoogleFont(cfg.fontFamily)`.

Nunca hospede fonte no resource (`.woff2`, `@font-face`, fonte no `files` do
`fxmanifest.lua`): ela só existe naquele resource e ele deixa de trocar junto.

## 8. Validação

1. Typecheck e build passando. Lua sem erro de sintaxe e, depois do `ensure`, nenhum
   erro do resource no console do servidor (o navegador não roda o Lua).
2. Prints (ou teste in-game) em: dark padrão; glass com opacidade 0.7; uma cor de
   fundo custom (ex. roxo); accent diferente; radius 0.
3. Abrir o resource ao lado do ox_lib (menu/notify) e do inventário: os três têm
   que mudar juntos, no mesmo tom.
4. Nada de cor fixa sobrando: `grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|bg-(zinc|neutral|gray|black|white)" src`.
