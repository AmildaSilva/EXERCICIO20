import { selector } from 'recoil'
import { tarefasState, filtroStatusState, filtroTextoState } from '../atoms/tarefas'

export const tarefasFiltradasState = selector({
  key: 'tarefasFiltradasState',
  get: ({ get }) => {
    const tarefas = get(tarefasState)
    const filtroStatus = get(filtroStatusState)
    const filtroTexto = get(filtroTextoState)

    
    if (!Array.isArray(tarefas)) return []

    return tarefas.filter(tarefa => {
    
      if (!tarefa || typeof tarefa.texto !== 'string') return false

      const statusOk =
        filtroStatus === 'todas' ||
        (filtroStatus === 'concluidas' && tarefa.concluida) ||
        (filtroStatus === 'pendentes' && !tarefa.concluida) // <-- espaço aqui

      const textoOk = tarefa.texto.toLowerCase().includes(filtroTexto.toLowerCase())

      return statusOk && textoOk
    })
  }
})