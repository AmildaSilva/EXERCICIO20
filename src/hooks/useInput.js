import { useState, useCallback } from "react";

export function useInput(valorInicial = "") {
  const [valor, setValor] = useState(valorInicial);

  const onChange = useCallback((e) => {
    setValor(e.target.value);
  }, []);

  const limpar = useCallback(() => setValor(""), []);

  return { valor, onChange, limpar };
}