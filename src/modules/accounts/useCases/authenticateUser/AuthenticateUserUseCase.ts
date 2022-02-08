import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IRequest {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
    ) {}

  async execute({ email, password}: IRequest) {
    // User exists
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password  incorrect!");
    }

    // Password Incorrect
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password  incorrect!");
    }

    // Save Token
    const token = sign({}, "5022762b6b5ed534482e2aba4420c710", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IRespose = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }

