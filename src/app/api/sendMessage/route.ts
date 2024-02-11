export async function POST(req: Request) {
  const { chat_id, text } = await req.json();
  const api = process.env.BOT_TOKEN;

  const response = await fetch(
    `https://api.telegram.org/bot${api}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id, text }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    return {
      status: 200,
      body: data,
    };
  } else {
    return {
      status: 500,
      body: data,
    };
  }
}

// function sendMessageViaBot(chat_id: number, text: string) {
//   const method = "sendMessage";
//   const url = `https://api.telegram.org/bot${apiKey}/${method}`;
//   const body = JSON.stringify({ chat_id, text });
//   const headers = {
//     "Content-Type": "application/json",
//     CORS: "no-cors",
//   };
//   fetch(url, { method: "POST", body, headers })
//     .then((response) => response.json())
//     .then((data) => console.log("Success:", data))
//     .catch((error) => console.error("Error:", error))
//     .finally(() => console.log("Finished"));
// }
