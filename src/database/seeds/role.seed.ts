import { DataSource } from 'typeorm';
import { Role, RoleType } from '../../users/entities/role.entity';

export async function seedRoles(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);

  const roles = [
    {
      name: RoleType.ADMIN,
      description: '管理员',
    },
    {
      name: RoleType.USER,
      description: '普通用户',
    },
    {
      name: RoleType.GUEST,
      description: '访客',
    },
  ];

  for (const role of roles) {
    const existingRole = await roleRepository.findOne({
      where: { name: role.name },
    });

    if (!existingRole) {
      await roleRepository.save(role);
    }
  }
}
