// @flow

import ejs from 'ejs';
import pluralize from 'pluralize';
import changeCase from 'change-case';
import { SchemaNameGenerator } from '@8base/schema-name-generator';
import type { TableSchema } from '@8base/utils';
import { formatCode } from '../formatCode';
import { chunks } from '../chunks';

// $FlowIgnore
import deleteForm from './deleteForm.js.ejs';

export const generateDeleteForm = (tablesList: TableSchema, tableName: string) => {
  const table = tablesList.find(({ name }) => tableName === name);

  if (!table) { throw new Error(`Can't find a table ${tableName}`); }

  const fields = table.fields.filter(({ isMeta }) => !isMeta);

  const entityName = pluralize.singular(tableName);

  const tableGenerated = ejs.render(deleteForm, {
    chunks,
    fields,
    changeCase,
    tableName,
    entityName,
    SchemaNameGenerator,
    pluralize,
  });

  return formatCode(tableGenerated);
};

