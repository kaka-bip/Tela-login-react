import "./style.css";
import api from '../../services/api';
import { useEffect, useState, useRef} from "react"; 
import Swal from 'sweetalert2';



function Home() {
  const [users,setUsers] = useState([])

  const inputname = useRef();
  const inputemail = useRef();
  const inputage = useRef();
  

  async function getUsers(){
    const usersFromApi = await api.get('/user')

    setUsers(usersFromApi.data)
  } 
  
async function createUsers() {
  const nome = inputname.current.value.trim();
  const idade = inputage.current.value;
  const email = inputemail.current.value.trim();

  // 🧩 1. Validação do nome
  if (nome === "") {
    Swal.fire({
      icon: "warning",
      title: "Campo obrigatório",
      text: "O campo Nome não pode estar vazio!",
    });
    return;
  }

  // 🧩 2. Validação da idade
  if (idade === "" || isNaN(idade) || idade < 0) {
    Swal.fire({
      icon: "error",
      title: "Idade inválida",
      text: "A idade deve ser um número positivo!",
    });
    return;
  }

  // 🧩 3. Validação do e-mail
  const emailRegex = /^[A-Za-z0-9@.]+$/;
  if (email === "") {
    Swal.fire({
      icon: "warning",
      title: "Campo obrigatório",
      text: "O campo E-mail não pode estar vazio!",
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "E-mail inválido",
      text: "O e-mail só pode conter letras, números, @ e .",
    });
    return;
  }

  try {
    // ✅ Se passou em todas as validações
    await api.post("/user", {
      name: nome,
      age: idade,
      email: email,
    });

    Swal.fire({
      icon: "success",
      title: "Usuário cadastrado!",
      text: "O usuário foi cadastrado com sucesso.",
      showConfirmButton: false,
      timer: 1500, // fecha automático após 1,5s
    });

    // 🔁 Recarrega a página após 1,5s
    setTimeout(() => {
      location.reload();
    }, 1500);

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    Swal.fire({
      icon: "error",
      title: "Erro ao cadastrar",
      text: "Verifique a conexão com o servidor.",
    });
  }
}
 

  
  async function deleteUsers(id){
    await api.delete(`/user/${id}`)

  } 

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuário</h1>
        <input type="text" name="Nome" placeholder="Nome"  ref={inputname} required/>
        <input type="number" name="Idade" placeholder="Idade"  ref={inputage}  min={0} required />
        <input type="email" name="E-mail" placeholder="E-mail" ref={inputemail} pattern="[A-Za-z0-9@.]+" required />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/ff0000/ios-filled/50/waste.png"
              alt="waste"
            />
          </button>
        </div>
      ))}

      <div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
