import React from 'react';
import Header from './components/Header/Header';
import Messages from './components/Message/Messages';
import FormWrapper from './components/Form/FormWrapper';




function App() {
  return (
    <div className="App container">
      <Header />
      <FormWrapper />
      <Messages/>
    </div>
  );
}

export default App;
