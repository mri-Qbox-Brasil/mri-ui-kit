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
