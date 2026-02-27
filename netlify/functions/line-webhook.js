exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 200,
      body: "Webhook is working",
    };
  }

  const body = JSON.parse(event.body);
  console.log("Received:", body);

  const replyToken = body.events[0]?.replyToken;

  if (replyToken) {
    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: "สวัสดี 👋 บอททำงานแล้ว!",
          },
        ],
      }),
    });
  }

  return {
    statusCode: 200,
    body: "OK",
  };
};
