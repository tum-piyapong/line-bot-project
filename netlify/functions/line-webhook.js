exports.handler = async (event) => {

  // ====== 1️⃣ ถ้าเป็น Webhook จาก LINE ======
  if (event.headers["user-agent"]?.includes("LineBotWebhook")) {

    const body = JSON.parse(event.body);

    console.log("FULL BODY:", JSON.stringify(body, null, 2));

    // ดึง userId
    const userId = body.events?.[0]?.source?.userId;

    console.log("USER ID:", userId);

    return {
      statusCode: 200,
      body: "Webhook received"
    };
  }


  // ====== 2️⃣ ถ้าเป็นคำสั่งจากหน้าเว็บ (Production Order) ======
  if (event.httpMethod === "POST") {

    const data = JSON.parse(event.body);

    const message = `
📦 คำสั่งผลิตใหม่

รหัสออเดอร์: ${data.orderCode}
สินค้า: ${data.product}
จำนวน: ${data.quantity}
รหัสสินค้า: ${data.productCode}
`;

    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: "U5f8bfc161e3271d3040a687da3f1d037",
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success" }),
    };
  }


  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
};
