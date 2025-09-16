// pages/server.js
const http = require("http");
const https = require("https");

// Конфиг Юкассы
const SHOP_ID = "1145046";
const SECRET_KEY = "test_aSr6OFJ9aoA3DjfxLfjWCa95lo1ptPyvqwX9iMU51QM";

const PORT = 4000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/create-payment") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { amount } = JSON.parse(body);

      const origin = req.headers.origin || `http://${req.headers.host || 'localhost:5173'}`;
      const data = JSON.stringify({
        amount: { value: amount, currency: "RUB" },
        confirmation: { type: "redirect", return_url: `${origin.replace(/\/$/, '')}/success` },
        capture: true,
        description: "Пополнение депозита"
      });

      const options = {
        hostname: "api.yookassa.ru",
        port: 443,
        path: "/v3/payments",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          "Idempotence-Key": Date.now().toString(),
          "Authorization":
            "Basic " + Buffer.from(SHOP_ID + ":" + SECRET_KEY).toString("base64")
        }
      };

      const apiReq = https.request(options, apiRes => {
        let responseData = "";
        apiRes.on("data", chunk => {
          responseData += chunk;
        });
        apiRes.on("end", () => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(responseData);
        });
      });

      apiReq.on("error", e => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      });

      apiReq.write(data);
      apiReq.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
