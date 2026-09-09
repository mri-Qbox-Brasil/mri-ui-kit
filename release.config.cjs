module.exports = {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/exec",
            {
                "prepareCmd": "pnpm run build && node scripts/update-cli-version.js"
            }
        ],
        [
            "@semantic-release/npm",
            {
                // O publish saiu daqui e virou o workflow publish.yml, que usa
                // trusted publishing (OIDC) — o npm amarra a permissao ao NOME
                // do arquivo de workflow, entao ele tem que ser dedicado.
                //
                // Com npmPublish=false o plugin NAO verifica credencial nenhuma
                // (ver verifyConditions no index.js do plugin), mas continua
                // fazendo o que precisamos aqui: bumpar a versao no package.json
                // pro @semantic-release/git commitar.
                "npmPublish": false,
                "pkgRoot": "."
            }
        ],
        [
            "@semantic-release/git",
            {
                "assets": ["package.json", "CHANGELOG.md", "bin/cli.js"],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ],
        "@semantic-release/github"
    ]
};
