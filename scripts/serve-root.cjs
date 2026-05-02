const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4176);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

http
  .createServer((request, response) => {
    const url = new URL(request.url || "/", `http://${host}:${port}`);
    const requestPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = path.resolve(root, `.${decodeURIComponent(requestPath)}`);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, host);
