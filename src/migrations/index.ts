import * as migration_20260927_201813_initial from './20260927_201813_initial';

export const migrations = [
  {
    up: migration_20260927_201813_initial.up,
    down: migration_20260927_201813_initial.down,
    name: '20260927_201813_initial'
  },
];
