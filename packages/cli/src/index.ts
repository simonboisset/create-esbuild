#!/usr/bin/env node

import create from './create';

create()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
