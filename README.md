# OGP Fetcher

OGP Fetcher は、指定された URL の OGP メタタグ情報を取得する Cloudflare Workers ベースの API です。

## インストール

```sh
npm install
```

## 開発サーバーの起動

```sh
npm run dev
```

## デプロイ

```sh
npm run deploy
```

## 使用方法

エンドポイントに GET リクエストを送信することで、OGP メタタグ情報を取得できます。

### リクエスト形式
```
GET /:url
```
`url` には OGP 情報を取得したいウェブサイトの URL をエンコードして指定してください。

### レスポンス形式

- `Accept: application/json` ヘッダーが含まれる場合、JSON 形式で OGP メタ情報を返します。
- その他の場合、プレーンテキスト形式で返します。

#### JSON レスポンスの例
```json
{
  "og:title": "Example Title",
  "og:description": "Example Description",
  "og:image": "https://example.com/image.jpg",
  "og:url": "https://example.com",
  "og:type": "website"
}
```

#### プレーンテキストレスポンスの例
```
og:title: Example Title
og:description: Example Description
og:image: https://example.com/image.jpg
og:url: https://example.com
og:type: website
```

## 環境構築

本プロジェクトは Cloudflare Workers で動作するため、`wrangler` を使用します。

### 必要なツール
- Node.js
- Wrangler CLI (`npm install -g wrangler`)

## 設定ファイル
- `wrangler.jsonc` ：Cloudflare Workers の設定
- `tsconfig.json` ：TypeScript の設定
- `package.json` ：依存関係とスクリプト

## コード概要

### `src/index.ts`
- `Hono` を使用してルーティングを管理
- `fetch` を使用して対象ページの HTML を取得
- `cheerio` を用いて OGP メタタグ情報を抽出
- クライアントの `Accept` ヘッダーを確認し、適切なレスポンスを返す

## ライセンス
MIT License

