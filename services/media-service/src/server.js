const http = require("node:http");
const { randomUUID } = require("node:crypto");

const PORT = Number(process.env.PORT || 8082);
const SERVICE_NAME = process.env.SERVICE_NAME || "media-service";
const ALLOWED_LOCALES = new Set(["ru", "en"]);

const mediaEntries = [
  {
    id: "hero-001-ru",
    section: "hero",
    videoUrl: "https://cdn.example.local/media/hero-001-ru.mp4",
    posterUrl: "https://cdn.example.local/media/hero-001-ru.jpg",
    title: "Metamorphosis",
    caption: "Тихая динамика формы",
    locale: "ru",
  },
  {
    id: "hero-001-en",
    section: "hero",
    videoUrl: "https://cdn.example.local/media/hero-001-en.mp4",
    posterUrl: "https://cdn.example.local/media/hero-001-en.jpg",
    title: "Metamorphosis",
    caption: "Quiet transformation of form",
    locale: "en",
  },
  {
    id: "vr-001-ru",
    section: "visual-research",
    videoUrl: "https://cdn.example.local/media/vr-001-ru.mp4",
    posterUrl: "https://cdn.example.local/media/vr-001-ru.jpg",
    title: null,
    caption: "Видео-дневник исследования материала",
    locale: "ru",
  },
  {
    id: "vr-001-en",
    section: "visual-research",
    videoUrl: "https://cdn.example.local/media/vr-001-en.mp4",
    posterUrl: "https://cdn.example.local/media/vr-001-en.jpg",
    title: null,
    caption: "Video journal of material research",
    locale: "en",
  },
];

function getRequestId(req) {
  return req.headers["x-request-id"] || randomUUID();
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, code, message, requestId) {
  sendJson(res, statusCode, {
    error: {
      code,
      message,
      requestId,
    },
  });
}

function parseLocaleOrFail(url, requestId, res) {
  const locale = url.searchParams.get("locale");
  const normalizedLocale = locale || "ru";

  if (!ALLOWED_LOCALES.has(normalizedLocale)) {
    sendError(
      res,
      400,
      "VALIDATION_ERROR",
      "Invalid locale. Allowed values: ru, en.",
      requestId
    );
    return { invalid: true };
  }

  return normalizedLocale;
}

const server = http.createServer((req, res) => {
  const requestId = String(getRequestId(req));
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method !== "GET") {
    sendError(res, 405, "VALIDATION_ERROR", "Only GET method is supported.", requestId);
    return;
  }

  if (url.pathname === "/health") {
    sendJson(res, 200, { service: SERVICE_NAME, status: "ok", requestId });
    return;
  }

  if (url.pathname === "/api/v1/media/hero") {
    const locale = parseLocaleOrFail(url, requestId, res);
    if (locale && locale.invalid) {
      return;
    }

    const heroEntries = mediaEntries
      .filter((entry) => entry.section === "hero" && entry.locale === locale)
      .map((entry) => ({
        id: entry.id,
        videoUrl: entry.videoUrl,
        posterUrl: entry.posterUrl,
        title: entry.title,
        locale: entry.locale,
      }));

    sendJson(res, 200, { items: heroEntries });
    return;
  }

  if (url.pathname === "/api/v1/media/visual-research") {
    const locale = parseLocaleOrFail(url, requestId, res);
    if (locale && locale.invalid) {
      return;
    }

    const visualEntries = mediaEntries
      .filter((entry) => entry.section === "visual-research" && entry.locale === locale)
      .map((entry) => ({
        id: entry.id,
        videoUrl: entry.videoUrl,
        posterUrl: entry.posterUrl,
        caption: entry.caption,
        locale: entry.locale,
      }));

    sendJson(res, 200, { items: visualEntries });
    return;
  }

  sendError(res, 404, "NOT_FOUND", "Route not found.", requestId);
});

server.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`${SERVICE_NAME} started on port ${PORT}`);
});

