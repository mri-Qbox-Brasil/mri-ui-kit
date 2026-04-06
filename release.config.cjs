module.exports = {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/exec",
            {
                "prepareCmd": "npm run build && node scripts/update-cli-version.js"
            }
        ],
        [
            "@semantic-release/npm",
            {
                "npmPublish": true,
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
