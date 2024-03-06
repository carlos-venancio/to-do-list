import Sqlite from "react-native-sqlite-storage";

Sqlite.enablePromise(true);

export const getDBConnection = async () => {
  // abrir a conexão com o banco de dados (cria caso não exista)
  const db = await Sqlite.openDatabase({
    name: "todo-data.db",
    location: "default",
  });

  // cria a tabela tarefas caso el não exista
  await db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tarefas(
                pk_tarefaId INTEGER PRIMARY KEY AUTOINCREMENT,
                tituloTarefa TEXT,
                dataInicio TEXT,
                duracao TEXT,
                descricao TEXT,
                status TEXT
            )`,
      [],
      () => console.log('Tabela "tarefas" criada com sucesso'),
      (err) => console.error('Erro ao criar a tabela "tarefas":', err)
    );
  });

  return async (statement, params, sucess, error) => {
    await db.transaction((tx) => {
      tx.executeSql(statement, params, sucess, error);
    })
    await db.close()
  };
};
