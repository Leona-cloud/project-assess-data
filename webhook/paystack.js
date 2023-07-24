const crypto = require("crypto");
const secretKey = process.env.paystackSecretKey;
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const paystackWebhook = async function (req, res) {
  const payload = req.body;
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(JSON.stringify(payload))
    .digest("hex");

  console.log(hash);
  const signature = req.headers["x-paystack-signature"];
  if (!signature || signature !== hash) {
    console.log("paysatck-webhook-error: event not triggered by paystack");
    return res.status(400).end();
  }
  const { event, data } = payload;
  console.log("paystack-event-paload:", data);

  switch (event) {
    case "charge.success":
      const status = data.status;

      if (status === "success") {
        const transaction = await Transaction.findOne({
          transactionReference: data.reference,
        });
        if (transaction) {
          await transaction
            .updateOne({ transactionReference: data.reference })
            .set({
              metaData: JSON.stringify(data),
              status: data.status,
              paymentChannel: data.channel,
            });
          const user = await User.findOne({ _id: transaction.userId });
          if (user) {
            await user
              .updateOne({ _id: user.id })
              .set({ paymentVerified: true });
          };
        }
      };

      break;
  }
};

module.exports = paystackWebhook;
