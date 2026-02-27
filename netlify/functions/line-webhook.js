exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 200,
      body: "Webhook is working",
    };
  }

  const body = JSON.parse(event.body);
  console.log("Received:", body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Webhook received" }),
  };
};
