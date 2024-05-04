import { FastifyInstance } from "fastify";
import { DataSource, Repository } from "typeorm";
import User from "../../db/entities/User";

export default class UserService {

  private db: DataSource;
  private userRepository: Repository<User>;

  constructor(db: DataSource){
    this.db = db;
    this.userRepository = db.getRepository(User);
  }
  
  public saveUser = async (user: User): Promise<User> => {
    return await this.userRepository.save(user);
  }

  public getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.userRepository.findOne({
      where: {
        email: email
      },
      relations: ['role']
    })
  }
  
  public userExists = async (email: string): Promise<boolean> => {
    return await this.userRepository.existsBy({
      email: email
    })
  }

}