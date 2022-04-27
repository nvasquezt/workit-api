const mercadopago = require ('mercadopago');

const TOKEN = process.env.MP_TOKEN;
mercadopago.configure({
  access_token: TOKEN,
});

const handlerPayment = async (req, res) => {
  let preference = {
    items: [
      {
        title:req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      }
    ],
    back_urls:{
      "success":'https://work-it.vercel.app'
    },
    auto_return: 'approved',
  };

  mercadopago.preferences.create(preference)
    .then(function(response){
      res.json(response.body.init_point);

    }).catch(function(error){
      console.log(error);
    });

}
const getFeedback = async (req, res) => {
  res.json("Payment Completed");
}
module.exports = {
    handlerPayment,
    getFeedback
};
