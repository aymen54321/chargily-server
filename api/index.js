export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await fetch("https://pay.chargily.net/test/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "test_sk_SaEpb2tgqPPMMKfyg4uHblhMVMltd19yXDks5C8S"
      },
      body: JSON.stringify({
        amount: 1000,
        client: "test@example.com",
        client_name: "Test User",
        mode: "CIB",
        success_url: "https://example.com/success",
        failure_url: "https://example.com/fail"
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
