import { DataSource, Repository } from "typeorm";
import Role from "../../db/entities/Role";

export default class RoleService {

  private db: DataSource;
  private roleRepository: Repository<Role>;

  constructor(db: DataSource){
    this.db = db;
    this.roleRepository = db.getRepository(Role);
  }
  
  public saveRole = async (role: Role): Promise<Role> => {
    return await this.roleRepository.save(role);
  }

  public findRole = async (role: string): Promise<Role | null> => {
    return await this.roleRepository.findOneBy({
      name: role
    })
  }

}