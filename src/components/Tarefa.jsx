import styled from 'styled-components'

const TarefaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  span {
    flex: 1;
    text-decoration: ${props => props.$concluida? 'line-through' : 'none'};
    opacity: ${props => props.$concluida? '0.6' : '1'};
  }
  
  button {
    background: #ff4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #cc0000;
    }
  }
`

export default function Tarefa({ tarefa, excluir, aoAlternarConcluida }) {
  // Proteção: se tarefa for undefined, não renderiza nada
  if (!tarefa) return null

  return (
    <TarefaItem $concluida={tarefa.concluida}>
      <input 
        type="checkbox" 
        checked={tarefa.concluida} 
        onChange={() => aoAlternarConcluida(tarefa.id)} 
      />
      <span>{tarefa.texto}</span>
      <button onClick={() => excluir(tarefa.id)}>Excluir</button>
    </TarefaItem>
  )
}