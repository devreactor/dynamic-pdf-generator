import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';

const App = () => {

  function createPdf() {
    axios.post('/api/createpdf',{})
      .then(() => axios.get('api/downloadpdf',{responseType:'blob'}))
      .then(res => {
        const pdfBlob = new Blob([res.data],{type:'application/pdf'});
        saveAs(pdfBlob, 'newPdf.pdf');
      });
  }


  return (
    <div>
      <button onClick={createPdf}>DOWNLOAD PDF</button>
    </div>
  );
}

export default App;
