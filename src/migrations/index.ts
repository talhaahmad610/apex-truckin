import * as migration_20260927_201813_initial from './20260927_201813_initial';
import * as migration_20260927_203606_crm from './20260927_203606_crm';
import * as migration_20260927_205541_blog from './20260927_205541_blog';

export const migrations = [
  {
    up: migration_20260927_201813_initial.up,
    down: migration_20260927_201813_initial.down,
    name: '20260927_201813_initial',
  },
  {
    up: migration_20260927_203606_crm.up,
    down: migration_20260927_203606_crm.down,
    name: '20260927_203606_crm',
  },
  {
    up: migration_20260927_205541_blog.up,
    down: migration_20260927_205541_blog.down,
    name: '20260927_205541_blog'
  },
];
