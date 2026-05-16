import ListaTarefas from "./components/ListaTarefas";
import Login from "./components/Login";
import { useRecoilValue } from "recoil";
import { userState } from './atoms/user';
import { tarefasFiltradasState } from "./selectors/tarefasFiltradasState";
import './App.css';

function App() {
  const usuario = useRecoilValue(userState);
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasState);

  return (
    <main className="container">
      <img className="imgLogo" src="/imagens/icone.png" alt="Ícone da aplicação" />
      
      {usuario.estaLogado ? (
        <>
          <h1>Rotina da {usuario.nome} ({tarefasFiltradas.length} tarefas)</h1>
          <ListaTarefas />
        </>
      ) : (
        <>
          <h1>Lista de Tarefas</h1>
          <Login />
        </>
      )}
    </main>
  );
}

export default App;