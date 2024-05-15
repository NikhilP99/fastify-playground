import { DataSource, Repository } from "typeorm";
import Permission from "../../db/entities/Permission";

export default class PermissionService {

  private db: DataSource;
  private permissionRepository: Repository<Permission>;

  constructor(db: DataSource){
    this.db = db;
    this.permissionRepository = db.getRepository(Permission);
  }
  
  public savePermission = async (permission: Permission): Promise<Permission> => {
    return await this.permissionRepository.save(permission);
  }

  public findPermission = async (permission: string): Promise<Permission | null> => {
    return await this.permissionRepository.findOneBy({
      permission: permission
    })
  }

  public saveIfNotExists = async (permissionName: string): Promise<Permission> => {
    let permission = await this.findPermission(permissionName);
    if(!permission){
      const newPermission = new Permission()
      newPermission.permission = permissionName;
      permission = await this.savePermission(newPermission)
    }

    return permission;
  }

}