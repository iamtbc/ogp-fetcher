import { load } from "cheerio";
import { Hono } from "hono";

const app = new Hono();

// OGP情報取得エンドポイント
app.get("/:url", async (c) => {
  // URL をデコード
  const rawUrl = c.req.param("url");
  const url = decodeURIComponent(rawUrl);

  if (!url.startsWith("http")) {
    return c.text("Invalid URL", 400);
  }

  try {
    // URLの内容を取得
    const response = await fetch(url);
    if (!response.ok) {
      return c.text("Failed to fetch the URL", 500);
    }

    const html = await response.text();
    const $ = load(html);

    // OGPメタタグを取得
    const ogp = {
      "og:title": $('meta[property="og:title"]').attr("content") || "",
      "og:description":
        $('meta[property="og:description"]').attr("content") || "",
      "og:image": $('meta[property="og:image"]').attr("content") || "",
      "og:url": $('meta[property="og:url"]').attr("content") || "",
      "og:type": $('meta[property="og:type"]').attr("content") || "",
    };

    // クライアントの Accept ヘッダーを確認
    const acceptHeader = c.req.header("Accept") || "";

    if (acceptHeader.includes("application/json")) {
      return c.json(ogp);
    }
    // text/plain 形式で返す
    const text = [
      `og:title: ${ogp["og:title"]}`,
      `og:description: ${ogp["og:description"]}`,
      `og:image: ${ogp["og:image"]}`,
      `og:url: ${ogp["og:url"]}`,
      `og:type: ${ogp["og:type"]}`,
    ].join("\n");
    return c.text(text);
  } catch (error) {
    return c.text("Error processing request", 500);
  }
});

export default app;
