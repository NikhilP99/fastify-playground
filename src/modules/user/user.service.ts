import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import User from "../../db/entities/User";

export default class UserService {

  private db: DataSource;

  constructor(db: DataSource){
    this.db = db;
  }
  
  public saveUser = async (user: User) => {
    return user
  }
  


}