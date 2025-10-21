import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/payment", async (req, res) => {
  const { amount, customer_name, customer_email } = req.body;

  try {
    const response = await fetch("https://pay.chargily.com/api/invoice", {
      method: "POST",
      headers: {
        "Authorization": "Bearer test_sk_SaEpb2tgqPPMMKfyg4uHblhMVMltd19yXDks5C8S", // مفتاحك السري التجريبي
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client: customer_name,
        client_email: customer_email,
        amount: amount,
        currency: "dzd",
        success_url: "https://success.com",
        failure_url: "https://fail.com"
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Chargily server running 🚀");
});

export default app;
