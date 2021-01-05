import React from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Messages from './components/Message/Messages';
// import MessageOnSubmit from './components/Message/MessageOnSubmit';



function App() {
  return (
    <div className="App container">
      <Header />
      <Form />
      {/* <MessageOnSubmit /> */}
      <Messages/>
    </div>
  );
}

export default App;
