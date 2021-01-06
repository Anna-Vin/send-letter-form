import React from 'react';
import Form from './Form';
import MessageOnSubmit from './../Message/MessageOnSubmit';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    sentLetters: store.form.sentLetters,
  };
};

const FormWrapper = ({sentLetters}) => {
  return (
    <div>
            {sentLetters.length ? (
        <>
          <MessageOnSubmit />
        </>
      ) : (
        <Form />
      )}
    </div>
  )
}

export default connect(mapStateToProps, null)(FormWrapper);
