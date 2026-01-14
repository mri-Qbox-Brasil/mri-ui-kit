# Guia de Publicação do Mri UI

Este guia descreve o processo passo-a-passo para publicar o pacote `packages/ui` no NPM.

## Publicando no NPM

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

> **Nota:** Se você receber um **Erro 403** (Forbidden) ao publicar, verifique:
> 1. **Nome do Pacote:** Se o nome for `@mriqbox/ui-kit`, você **precisa** criar uma Organização chamada `mriqbox` no NPM ou mudar o nome para `@seu-usuario/ui-kit`.
> 2. **Token (Alternativa):** Se o login interativo falhar, você pode usar um Token de Acesso.

#### Configurando um Token (Caso necessário)
Se o comando pedir um token ou der erro:
1. Vá em [npmjs.com > Access Tokens](https://www.npmjs.com/settings/tokens) e gere um token (Tipo "Publish" ou "Automation").
2. Crie um arquivo `.npmrc` na raiz do projeto com o conteúdo:
   ```env
   //registry.npmjs.org/:_authToken=SEU_TOKEN_AQUI
   ```
   *(⚠️ Importante: Adicione `.npmrc` ao seu `.gitignore` para não vazar o token)*

### 4. Publicar
Execute o comando de publicação:

```bash
npm publish --access public
```

### 5. Usando no Projeto
Depois de publicado, você pode voltar ao seu projeto `meu-projeto` e substituir a dependência local pela do NPM:

1.  Edite `package.json`:
    ```diff
    - "@meu-projeto/ui": "workspace:*",
    + "@mriqbox/ui-kit": "^1.0.0",
    ```
2.  Desinstale a referência local e instale a do NPM:
    ```bash
    pnpm install
    ```
