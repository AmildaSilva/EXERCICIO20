import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/user';
import { useInput } from '../../hooks/useInput';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Botao = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

function Login() {
  const setUsuario = useSetRecoilState(userState);
  const nome = useInput('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!nome.valor.trim()) return;

    setUsuario({
      nome: nome.valor.trim(),
      estaLogado: true
    });
  };

  return (
    <Container>
      <h2>Bem-vindo!</h2>
      <p>Digite seu nome para começar</p>
      
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <Input
          type="text"
          placeholder="Seu nome"
          value={nome.valor}
          onChange={nome.onChange}
          autoFocus
        />
        <Botao type="submit" disabled={!nome.valor.trim()}>
          Entrar
        </Botao>
      </form>
    </Container>
  );
}

export default Login;