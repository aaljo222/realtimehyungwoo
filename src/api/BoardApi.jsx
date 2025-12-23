import axios from "axios";
import {createTableConfig, excludeColumns } from "./commonApi";
import PostApi from "./PostApi";
import { tableDefinitions } from "./tablesConfig";

const tableName = "board";

const extraButtons =
  [

  ];

var tableDefinition = tableDefinitions[tableName];
tableDefinition = {
  ...tableDefinition,
  allColumns: {
    ...tableDefinition.allColumns,
    searchColumns: {
      "one": tableDefinition.allColumns.responseColumns
    }
  }
}
const config = createTableConfig(tableDefinition, extraButtons);


export default { config };  