# VSCode-style Portfolio

Vite + React + Tailwind で作った VS Code 風ポートフォリオです。

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)
1) `vite.config.ts` の `base` をリポジトリ名に合わせて設定
```ts
export default defineConfig({
  base: "/<repo-name>/",
});
```

2) デプロイ
```bash
npm i -D gh-pages
npm run build
npx gh-pages -d dist
```

3) GitHub Pages の Source を `gh-pages` ブランチに設定

## Assets
画像は `public/assets/` 配下に置くと表示されます。
- `public/assets/face.jpg`
- `public/assets/shigachat.png`
- `public/assets/図1.png`
- `public/assets/sharedplans.png`
- `public/assets/hobbies/golf.jpg`
- `public/assets/skills/*.svg`
