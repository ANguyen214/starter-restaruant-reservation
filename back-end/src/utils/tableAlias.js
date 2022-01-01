function tableAlias(tableName) {
    return `${tableName} as ${tableName[0]}`;
  }
  
  module.exports = tableAlias;