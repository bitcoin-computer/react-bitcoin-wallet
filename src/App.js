import React, { useState, useEffect } from 'react'
import Computer from 'bitcoin-computer'
import './App.css'

function App() {
  // If you do not have a 12 word (BIP39) KeyPhrase 
  //Please visit http://accounts.protoshi.com to generate one
  const _seed = 'stool used axis news dog empty attitude reflect aware spawn payment whale'
  if (_seed === "Enter Your Seed Phrase Here"){
    alert("You Must Enter A Seed Phrase in the App.js File To Set Up A Bitcoin Computer.")
  }
  const [computer] = useState(new Computer({
    seed: _seed,
    chain: 'BSV'
  }))
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [to, setTo] = useState('')

  useEffect(() => {
   async function refresh() {
      if(_seed !== "Enter Your Seed Phrase Here" &&  computer)
        setBalance(await computer.db.wallet.getBalance())
    }
    refresh()
  }, [computer])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const txId = await computer.db.wallet.send(parseInt(amount, 10), to)
    const message = `Sent\n${amount}\n\nTo\n${to}\n\nTransaction id\n${txId}`
    console.log(message)
    alert(message)
  }
  const handleOnBlur = async (e) =>{
    if(e.target.id === 'inputAmount'){
      setAmount(e.target.value)
    }else if(e.target.id === 'inputTo') {
      setTo(e.target.value)
    }
  }
  return (
    <div className="App">
      <div class="form-wrapper">
        <h3>My Wallet</h3>
        <h1>Balance:</h1><h1>{balance/1e8} {computer.db.wallet.restClient.chain} </h1>
        <b>My Address</b><br/>{computer.db.wallet.getAddress().toString()}<br /><br />
        <b>My Public Key</b><br/>{computer.db.wallet.getPublicKey().toString()}<br />
        <br/><hr/>
        <form onSubmit={handleSubmit}>
        <h2>Send Bitcoin</h2>
        <div class="form-item">
            <label for="inputAmount"># of Satoshis To Send. (max: {balance - 1000})</label>
            <input type="number" name="inputAmount" id="inputAmount" required="required" defaultValue={amount} onBlur={handleOnBlur}></input>
          </div>
          <div class="form-item">
            <label for="inputTo">To BSV Address</label>
            <input type="text" name="inputTo" id="inputTo" required="required" placeholder="Address" defaultValue={to} onBlur={handleOnBlur}></input>
          </div>
          <div class="button-panel">
            <button type="submit" class="button" title="Send Bitcoin">Send {amount} Satoshis</button>
          </div>
        </form>
        <div class="form-footer">
          <p><a target="_blank" rel="noopener noreferrer" href="http://accounts.protoshi.com">Need A Seed?</a></p>
          <p><a target="_blank" rel="noopener noreferrer" href="http://bitcoincomputer.io">Learn More</a></p>
        </div>
      </div>
    </div>
  )
}

export default App
