import { DataSource } from 'typeorm';
import { seedRoles } from './role.seed';

export async function runSeeds(dataSource: DataSource): Promise<void> {
  await seedRoles(dataSource);
}
