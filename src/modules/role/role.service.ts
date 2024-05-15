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

  public saveIfNotExists = async (roleName: string): Promise<Role> => {
    let role = await this.findRole(roleName);
    if(!role){
      const newRole = new Role()
      newRole.name = roleName;
      role = await this.saveRole(newRole)
    }

    return role;
  }

}