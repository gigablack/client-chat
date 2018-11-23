import React, { Component } from 'react';
import Chat from './Components/Chat'
import planetLogo from './images/planet-logo.png'

class App extends Component {
  componentDidMount(){
    console.log(document.getElementById('img').classList)
  }
  render() {
    return (
      <div className="App bg-light">
        
        
        <div className='row'>
          <div className='col-4 text-right'>
            <img src={planetLogo} alt='planet' className='img-fluid planet animated slow fadeInRight delay-5s' id='img'></img>
          </div>
          <div className='col-8'>
            <h1 className='display-1 text-left app-title mt-3 animated fadeIn slower delay-3s'>React Chat</h1>
          </div>
        </div>
        <Chat />
      </div>
    );
  }
}

export default App;
