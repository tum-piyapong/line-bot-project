exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log("Received:", body);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Webhook received" }),
  };
};
