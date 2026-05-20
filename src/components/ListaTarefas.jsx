import { useCallback, useEffect } from "react"
import Tarefa from "./Tarefa"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { tarefasState, filtroStatusState, filtroTextoState } from "../atoms/tarefas"
import { tarefasFiltradasState } from "../selectors/tarefasFiltradasState"
import { useInput } from "../hooks/useInput"
import { userState } from "../atoms/user"

const API_URL = "https://6a0824e9fa9b27c848fab1e9.mockapi.io/api/v1/tarefas"

function ListaTarefas() {
  const setTarefas = useSetRecoilState(tarefasState)
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasState)
  const tarefa = useInput()
  const usuario = useRecoilValue(userState)
  const [filtroStatus, setFiltroStatus] = useRecoilState(filtroStatusState)
  const [filtroTexto, setFiltroTexto] = useRecoilState(filtroTextoState)

  useEffect(() => {
    fetch(API_URL)
   .then(resposta => {
        if (!resposta.ok) throw new Error('API falhou')
        return resposta.json()
      })
   .then(dados => {
        
        setTarefas(Array.isArray(dados)? dados : [])
      })
   .catch(error => {
        console.error("Erro ao buscar tarefas:", error)
        setTarefas([])
      })
  }, [setTarefas])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tarefa.valor.trim()) return

    const nova = {
      usuario: usuario.nome,
      texto: tarefa.valor,
      concluida: false
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova)
    })
   .then(resposta => resposta.json())
   .then(tarefaCriada => {
        // MockAPI já retorna com id
        setTarefas(prev => [...prev, tarefaCriada])
        tarefa.limpar()
      })
   .catch(error => console.error("Erro ao adicionar tarefa:", error))
  }

  const handleExcluir = useCallback((id) => {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return

    setTarefas(prev => {
      const tarefasAnteriores = prev
      const novasTarefas = prev.filter(t => t.id!== id)

      fetch(`${API_URL}/${id}`, { method: "DELETE" })
     .then(resposta => {
          if (!resposta.ok) {
            setTarefas(tarefasAnteriores)
            console.error("Erro ao excluir tarefa:", resposta.status)
          }
        })
     .catch(error => {
          setTarefas(tarefasAnteriores)
          console.error("Erro ao excluir tarefa:", error)
        })

      return novasTarefas
    })
  }, [setTarefas])

  const handleAlternarConcluida = useCallback((idDaTarefa) => {
    setTarefas(prevTarefas => {
      let tarefaAtualizada
      const novasTarefas = prevTarefas.map(t => {
        if (t.id === idDaTarefa) {
          tarefaAtualizada = {...t, concluida:!t.concluida }
          return tarefaAtualizada
        }
        return t
      })

      if (tarefaAtualizada) {
        const { id,...dadosParaAPI } = tarefaAtualizada
        fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaAPI)
        }).catch(() => {
          setTarefas(prev => prev.map(t =>
            t.id === idDaTarefa? {...t, concluida:!tarefaAtualizada.concluida } : t
          ))
        })
      }

      return novasTarefas
    })
  }, [setTarefas])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={tarefa.valor}
          onChange={tarefa.onChange}
        />
        <button type="submit" disabled={!tarefa.valor.trim()}>
          {usuario.nome} - Adicionar
        </button>

        <input
          type="text"
          placeholder="Buscar por texto..."
          value={filtroTexto}
          onChange={e => setFiltroTexto(e.target.value)}
        />

        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="concluidas">Concluídas</option>
          <option value="pendentes">Pendentes</option>
        </select>
      </form>

      {tarefasFiltradas.length === 0? (
        <p>Nenhuma tarefa encontrada</p>
      ) : (
        <ul>
          {tarefasFiltradas
          .filter(t => t && t.id)
          .map((tarefa, index) => (
              <Tarefa
                key={`${tarefa.id}-${index}`}
                tarefa={tarefa}
                excluir={handleExcluir}
                aoAlternarConcluida={handleAlternarConcluida}
              />
            ))}
        </ul>
      )}
    </>
  )
}

export default ListaTarefas