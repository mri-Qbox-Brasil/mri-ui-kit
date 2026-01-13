# Guia de Extração e Publicação do Mri UI

Este guia descreve o processo passo-a-passo para separar o pacote `packages/ui` em seu próprio repositório e publicá-lo no NPM.

## Parte 1: Extraindo para um Novo Repositório

Faremos isso usando `git subtree`, que é a maneira mais limpa de extrair uma pasta preservando seu histórico de commits.

### 1. Preparação
Abra o terminal na **raiz** do seu projeto atual (`ps-adminmenu`).

### 2. Criar uma nova branch apenas com a UI
Execute este comando para criar uma branch chamada `ui-only` contendo apenas o conteúdo de `packages/ui`:

```bash
git subtree split --prefix=packages/ui -b ui-only
```

### 3. Criar o novo repositório
1.  Vá ao GitHub e crie um novo repositório vazio (ex: `mri-ui`).
2.  Copie a URL do repositório (ex: `https://github.com/seu-usuario/mri-ui.git`).

### 4. Enviar os arquivos para o novo repositório
Ainda no terminal do projeto antigo:

```bash
# Adicione o novo repositório como um remoto temporário
git remote add new-ui https://github.com/seu-usuario/mri-ui.git

# Envie a branch ui-only para a branch main do novo repositório
git push new-ui ui-only:main
```

### 5. Clonar o novo projeto (Opcional mas recomendado)
Agora que os arquivos estão lá, você pode clonar o novo repositório em outra pasta para trabalhar nele isoladamente:

```bash
cd ..
git clone https://github.com/seu-usuario/mri-ui.git
cd mri-ui
```

---

## Parte 2: Publicando no NPM

Agora que você tem o projeto isolado (ou mesmo se quiser publicar direto do monorepo), siga estes passos.

### 1. Preparar o package.json
Abra o `package.json` do pacote de UI e faça os seguintes ajustes:

1.  **Nome:** Certifique-se que o nome é único no NPM.
    *   Ex: `"name": "@mri-org/ui"` ou `"name": "mri-ui-kit"`.
    *   *Dica: Se usar `@mri/ui`, você precisará criar uma organização no NPM ou usar seu usuário como escopo (ex: `@seu-usuario/ui`).*

2.  **Privacidade:** Mude ou remova o campo `private`.
    ```diff
    - "private": true,
    + "publishConfig": { "access": "public" },
    ```

3.  **Versão:** Defina a versão inicial.
    ```json
    "version": "1.0.0"
    ```

### 2. Build Limpo
Garanta que a pasta `dist` está atualizada e limpa.

```bash
pnpm install
pnpm build
```

*(Verifique se a pasta `dist` foi criada corretamente com os arquivos `.js`, `.d.ts` e `.css`)*

### 3. Login no NPM
Você precisa ter uma conta no [npmjs.com](https://www.npmjs.com/).

```bash
npm login
```
*(Siga as instruções no navegador para autenticar)*

### 4. Publicar
Execute o comando de publicação:

```bash
npm publish --access public
```

### 5. Usando no Projeto Original
Depois de publicado, você pode voltar ao seu projeto `ps-adminmenu` e substituir a dependência local pela do NPM:

1.  Edite `web/package.json`:
    ```diff
    - "@ps-adminmenu/ui": "workspace:*",
    + "@mri-org/ui": "^1.0.0",
    ```
2.  Desinstale a referência local e instale a do NPM:
    ```bash
    pnpm install
    ```

---

## Parte 3: Publicando o Storybook na Vercel

Você pode hospedar a documentação do Storybook gratuitamente na Vercel para que outros desenvolvedores possam consultar.

### 1. Preparação na Vercel
1.  Acesse [vercel.com](https://vercel.com/) e faça login.
2.  Clique em **"Add New..."** -> **"Project"**.
3.  Selecione o repositório `mri-ui` (que você criou na Parte 1) e clique em **Import**.

### 2. Configuração do Build
Na tela de configuração da importação, defina o seguinte:

*   **Framework Preset:** A Vercel geralmente detecta `Vite` ou `Storybook`. Se não detectar automaticamente, selecione **"Vite"** (pois seu projeto usa `@storybook/react-vite`).
*   **Build Command:** Substitua para:
    ```bash
    pnpm build-storybook
    ```
    *(Este é o script definido no seu package.json)*
*   **Output Directory:** Defina como:
    ```bash
    storybook-static
    ```
    *(Este é o padrão do comando build-storybook)*

### 3. Deploy
1.  Clique em **Deploy**.
2.  Aguarde o processo de build.
3.  Quando terminar, você terá uma URL pública (ex: `https://mri-ui.vercel.app`) com sua documentação e design system online!

### 4. Atualizações Automáticas
Sempre que você fizer um `git push` para a branch `main` do seu repositório `mri-ui`, a Vercel irá automaticamente reconstruir e atualizar o site do Storybook.

---

## Parte 4: Otimização de Tráfego (Cloudflare & Vercel)

Se você estiver usando contas gratuitas, aqui estão as melhores configurações para otimizar performance e economizar banda.

### 1. Cloudflare (Recomendado para DNS/Proxy)

Se você gerencia seu domínio pelo Cloudflare (proxy laranja ativado), ative estas opções na aba **Speed** > **Optimization**:

1.  **Auto Minify:** Marque *JavaScript*, *CSS* e *HTML*.
    *   *O que faz:* Remove espaços e comentários inúteis dos arquivos, reduzindo o tamanho do download.
2.  **Brotli:** Certifique-se de que está **ON**.
    *   *O que faz:* Compactação mais eficiente que o Gzip.
3.  **Rocket Loader:** Ative (ON).
    *   *O que faz:* Prioriza o conteúdo (texto/imagens) e carrega JavaScripts de forma assíncrona. *Nota: Se quebrar algo no site, desative.*

Na aba **Caching** > **Configuration**:

1.  **Caching Level:** Defina como **Standard**.
2.  **Browser Cache TTL:** Aumente para **1 mês** ou **1 ano** se o conteúdo muda pouco.
    *   *O que faz:* Diz ao navegador do usuário para guardar arquivos estáticos por mais tempo, evitando baixar de novo.
3.  **Crawler Hints:** Ative (ON).

**Bônus de Segurança (Scrape Shield):**
*   Ative **Email Address Obfuscation** para evitar bots de spam.
*   Ative **Hotlink Protection** para impedir que outros sites usem suas imagens diretamente (economiza banda).

### 2. Vercel (Hospedagem)

A Vercel já faz muita coisa automaticamente, mas você pode garantir o máximo de performance:

1.  **Vercel Edge Network:**
    *   Seu site já é distribuído globalmente pela CDN da Vercel. Não há configuração extra necessária no plano free.

2.  **Cache de Arquivos Estáticos:**
    *   Assets gerados pelo Vite (na pasta `assets` com hash no nome) já são servidos com `Cache-Control: immutable`. Isso significa que o navegador nunca pede o arquivo de novo até que você faça um novo deploy (que muda o hash).

3.  **Speed Insights (Analytics):**
    *   Ative o **Speed Insights** na aba do projeto na Vercel.
    *   *Plano Grátis:* Permite ver a pontuação real de performance (Core Web Vitals) dos seus usuários. Isso te ajuda a saber se o site está lento em 3G/4G.

4.  **Otimização de Imagens (Cuidado):**
    *   O componente `<Image />` do Next.js ou Vercel otimiza imagens automaticamente, MAS o plano gratuito tem limite de 1000 otimizações/mês.
    *   *Dica:* Para sites pequenos/pessoais, prefira enviar as imagens já otimizadas (WebP) e usar a tag `<img>` padrão ou o componente do Storybook para não estourar o limite da Vercel.
