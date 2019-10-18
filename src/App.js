import React, { useState, useEffect } from 'react';
import Computer from 'bitcoin-computer'
import logo from './logo.svg';
import './App.css';

function App() {
  const [computer] = useState(new Computer({ seed: 'describe install ostrich blast region era course junior feed acoustic galaxy annual'}))
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')

  useEffect(async () => {
    setBalance(await computer.db.wallet.getBalance())
  }, [computer.db.wallet])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const { txId } = await computer.db.wallet.send(parseInt(amount), to)
    alert(`Sent ${amount} to ${to} in tx with id\n${txId}`)
  }

  return (
    <div className="App">
      <h2>Wallet</h2>
      <b>Address</b>&nbsp;{computer.db.wallet.getAddress().toString()}<br />
      <b>Balance</b>&nbsp;{balance}

      <h3>Send</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount&nbsp;
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}>
          </input>
        </label><br />
        <label>
          To&nbsp;
          <input type="string" value={to} onChange={e => setTo(e.target.value)}>
          </input>
        </label><br />
        <input type="submit" value="Send Bitcoin"></input>
      </form>
    </div>
  );
}

export default App;
