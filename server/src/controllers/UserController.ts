import User from "../models/User";

const createUser = async (req: any, res: any) => {
  try {
    const { name, cpf, password } = req.body;

    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
      return res.status(409).json({ message: "Usuario já cadastrado" });
    }

    const newUser = new User({ name, cpf, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso.", data: newUser });
  } catch (error) {
    console.error("Erro ao criar o usuário:", error);
    res.status(500).json({ message: "Erro ao criar o usuário." });
  }
};

const getByCpf = async (req: any, res: any) => {
  try {
    const { cpf } = req.params;

    const user = await User.findOne({ cpf });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao obter o usuário:", error);
    res.status(500).json({ message: "Erro ao obter o usuário." });
  }
};

export default { createUser, getByCpf };
