// SignaturePad.js
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './SignaturePad.css'; // Import any styles for the signature pad

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      onSave(dataURL);
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
    </div>
  );
};

export default SignaturePad;
