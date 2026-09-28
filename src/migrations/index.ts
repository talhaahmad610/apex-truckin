import * as migration_20260927_201813_initial from './20260927_201813_initial';
import * as migration_20260927_203606_crm from './20260927_203606_crm';
import * as migration_20260927_205541_blog from './20260927_205541_blog';
import * as migration_20260927_213757_content from './20260927_213757_content';
import * as migration_20260927_233659_rates from './20260927_233659_rates';
import * as migration_20260928_185836_scripts_tracking from './20260928_185836_scripts_tracking';
import * as migration_20260928_192441_page_builder from './20260928_192441_page_builder';
import * as migration_20260928_223746_flight_sources from './20260928_223746_flight_sources';

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
    name: '20260927_205541_blog',
  },
  {
    up: migration_20260927_213757_content.up,
    down: migration_20260927_213757_content.down,
    name: '20260927_213757_content',
  },
  {
    up: migration_20260927_233659_rates.up,
    down: migration_20260927_233659_rates.down,
    name: '20260927_233659_rates',
  },
  {
    up: migration_20260928_185836_scripts_tracking.up,
    down: migration_20260928_185836_scripts_tracking.down,
    name: '20260928_185836_scripts_tracking',
  },
  {
    up: migration_20260928_192441_page_builder.up,
    down: migration_20260928_192441_page_builder.down,
    name: '20260928_192441_page_builder',
  },
  {
    up: migration_20260928_223746_flight_sources.up,
    down: migration_20260928_223746_flight_sources.down,
    name: '20260928_223746_flight_sources'
  },
];
