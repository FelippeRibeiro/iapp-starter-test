const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/iapp`)
    .then(() => {
      console.log("Conectado ao banco de dados");
    })
    .catch((error: any) => {
      console.error("Erro ao conectar ao banco de dados:", error);
    });
};

export default { connect };
