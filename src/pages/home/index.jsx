import "./style.css";
import api from '../../services/api';
import { useEffect, useState, useRef} from "react"; 


function Home() {
  const [users,setUsers] = useState([])

  const inputname = useRef();
  const inputemail = useRef();
  const inputage = useRef();
  

  async function getUsers(){
    const usersFromApi = await api.get('/user')

    setUsers(usersFromApi.data)
  } 
  
  async function createUsers(){
    await api.post('/user', {
      name: inputname.current.value,
      age: inputage.current.value,
      email: inputemail.current.value
    })
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
        <input type="text" name="Nome" required placeholder="Nome" ref={inputname}/>
        <input type="number" name="Idade" placeholder="Idade"  ref={inputage}/>
        <input type="e-mail" name="Email" required placeholder="Email" ref={inputemail}/>
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
