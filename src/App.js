import { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function App() {

  // form states
 // const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [APIdata, setAPIdata] = useState([]);
  const [refresh, setRefresh] = useState([]);

  // submit event
  const onSubmit = () => {
    axios.post(`https://sheet.best/api/sheets/97491871-eae0-4b87-a3e8-e2ac53d64fdc`,{
      name, age, phone
    })
    .then((data) => {
      setRefresh(data);
    })
  }

  // fetch date
  useEffect(() => {
    axios.get(`https://sheet.best/api/sheets/97491871-eae0-4b87-a3e8-e2ac53d64fdc`)
    .then((incomingData) => {
      setAPIdata(incomingData.data);
    })
  }, [refresh])

  return (
    <div className="container">
      <br></br>
      <h1>Dados dos alunos</h1>
      <br></br>

      {/* form */}
      <form autoComplete="off" className='form-group'>
        <label>Nome</label>
        <input type='text' placeholder='Digite seu Nome' required className='form-control'
        onChange = {(e) => setName(e.target.value)}
        />
        <br></br>
        <label>Idade</label>
        <input type='text' placeholder='Digite sua Idade' required className='form-control'
        onChange = {(e) => setAge(e.target.value)}
        />
        <br></br>
        <label>Telefone</label>
        <input type='text' placeholder='Digite seu Telefone' required className='form-control'
        onChange = {(e) => setPhone(e.target.value)}
        />
        <br></br>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button type='submit' className='btn btn-primary'
          onClick={onSubmit}
          >Enviar</button>
        </div>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Telefone</th>
          </tr>
        </thead>

        <tbody>
          {APIdata.map((data) => {
            return (
              <tr>
            <td>{data.name}</td>
            <td>{data.age}</td>
            <td>{data.phone}</td>
            </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
