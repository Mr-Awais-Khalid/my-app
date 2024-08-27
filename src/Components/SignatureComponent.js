import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faUpload } from '@fortawesome/free-solid-svg-icons';

const SignatureComponent = () => {
  const [signature, setSignature] = useState(null);
  const [signatureLabel, setSignatureLabel] = useState('Authorised Signatory');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSignature(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveSignature = () => {
    setSignature(null);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLabelChange = (e) => {
    setSignatureLabel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg shadow-lg w-96">
      <div className="text-xl font-semibold mb-4">Signature</div>
      {signature ? (
        <div className="relative mb-4">
          <img src={signature} alt="signature" style={{ width: '200px', height: '100px' }} />
          <button
            type="button"
            onClick={handleRemoveSignature}
            style={{
              position: 'absolute',
              top: '1px',
              right: '5px',
              background: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
              zIndex: '1',
            }}
          >
            X
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="border-2 border-dashed border-purple-400 rounded-lg h-32 flex items-center justify-center mb-4">
            <button type="button" onClick={handleOpenModal} className="text-purple-600 flex flex-col items-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2H6c-1.105 0-2 .895-2 2zM4 8h16M4 12h16M4 16h16" />
              </svg>
              <span>Upload</span>
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={handleOpenModal} className="flex items-center text-purple-600">
              <FontAwesomeIcon icon={faPenFancy} size="lg" className="mr-2" />
              Use Signature Pad
            </button>
            <label htmlFor="file-upload" className="flex items-center text-purple-600 cursor-pointer">
              <FontAwesomeIcon icon={faUpload} size="lg" className="mr-2" />
              <span>Upload Signature</span>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="signatureLabel" className="block text-sm font-medium text-gray-700 mb-2">Add Signature Label</label>
        <input
          type="text"
          id="signatureLabel"
          value={signatureLabel}
          onChange={handleLabelChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      {/* Modal for Signature Pad */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Signature Pad</h2>
            {/* Add your signature pad component here */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignatureComponent;
