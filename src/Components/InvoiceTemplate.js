import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ja from '../Assets/Companyheader.jpg';
import SignaturePad from './SignaturePad';
 import Modal from 'react-modal';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faPenFancy, faUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
  
function InvoiceTemplate() {
    const [invoiceData, setInvoiceData] = useState('')
    const [base64Image, setBase64Image] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessPhone, setbusinessPhone] = useState('');
    const [businessEmail, setbusinessEmail] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');

    const [clientName, setclientName] = useState('');
    const [clientPhone, setclientPhone] = useState('');
    const [clientEmail, setclientEmail] = useState('');
    const [clientAddress, setclientAddress] = useState('');

    const [invoiceTitle, setInvoiceTitle] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [invoiceNote, SetinvoiceNote] = useState('');
    const [termsConditions, settandC] = useState('');
    const [currency, setCurrency] = useState('');
    const [signature, setSignature] = useState("");
   
    Modal.setAppElement('#root'); // Replace with your app root element if different
    
    
     
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleSaveSignature = (dataURL) => {
        console.log("Data URL received from SignaturePad:", dataURL);
        setSignature(dataURL);
        setIsModalOpen(false);
      };
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSignature(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted, signature Data URL:", signature);
        // Handle form submission and save signature data URL
      };
      const handleRemoveSignature = () => {
        setSignature("");
      };

    const pdfRef = useRef();
    const downloadPDF = () => {
      const input = pdfRef.current;
      html2canvas(input, { scale: 2, useCORS: true, logging: true}).then((canvas)=>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth , pdfHeight/imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(imgData, 'png', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('invoice.pdf');
          })
    };
    
    // const downloadPDF = () => {
    //     const input = pdfRef.current;
    //     html2canvas(input, { scale: 2, useCORS: true, logging: true }).then((canvas) => {
    //       const imgData = canvas.toDataURL();
    //       const imgType = imgData.substring(imgData.indexOf('/') + 1, imgData.indexOf(';')); // Extract the image format
      
    //       const pdf = new jsPDF('p', 'mm', 'a4', true);
    //       const pdfWidth = pdf.internal.pageSize.getWidth();
    //       const pdfHeight = pdf.internal.pageSize.getHeight();
    //       const imgWidth = canvas.width;
    //       const imgHeight = canvas.height;
    //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //       const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //       const imgY = 0;
      
    //       pdf.addImage(imgData, imgType, imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //       pdf.save('invoice.pdf');
    //     });
    //   };
      
    return (
        <div >


            <div className="flex items-end justify-end space-x-4 my-4">
                <button
                    onClick={downloadPDF}
                    className="mt-4 px-4 py-2 rounded bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    <i className="fa-light fa-download text-white mr-2 "></i>Download Invoice
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white lg p-8 h-full" ref={pdfRef}>

                <div className="topDiv flex items-start justify-between w-full space-x-4">
                    <div className="flex w-full flex-col">

                        {/* Logo Upload Here */}
                        <div>
                           <img src={ja}/>
                        </div>

                        {/* Business Details */}
                        <div className="w-full mt-4">
                            <h1 className="text-2xl font-semibold">asdsa</h1>
                            <p className="max-w-lg">adsad</p>
                        </div>
                    </div>

                    <div class="flex flex-col items-end gap-3">
                           <h1 class="text-6xl uppercase tracking-wide mb-2">Invoice</h1>
                           <p class="text-gray-800 w-24 h-12 text-lg rounded-full font-semibold flex items-center justify-center">sdsad</p>
                    </div>
                </div>

                <hr className="my-4 border-t-2 rounded-full" />

                <div className="flex w-full space-x-4">

                    <div className="w-full">
                        <h4 className="leading-7 text-gray-600 underline">Client Detail</h4>
                        <div>
                            <p className="text-lg font-semibold">adad</p>
                            <p>asdsada</p>
                            <p>asdsada</p>
                            <p className="space-y-4">
                                sad
                            </p>
                        </div>
                    </div>

                    <div class="w-1/3 flex flex-col items-end justify-start space-y-4">
                        <dl class="flex space-x-4">
                            <dt class="col-span-3 font-semibold text-gray-800">Invoice date:</dt>
                            <dd class="col-span-2 text-gray-500">sda</dd>
                        </dl>
                        <dl class="flex space-x-4">
                            <dt class="col-span-3 font-semibold text-gray-800">Due date:</dt>
                            <dd class="col-span-2 text-red-500">ad</dd>
                        </dl>
                    </div>

                </div>


                <div className="flex w-full space-x-4 mt-8">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border border-separate rounded border-slate-200"
                            cellSpacing="2">
                            <thead>
                                <tr>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Sr#
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        className='h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100'
                                    >
                                        Discount
                                    </th>
                                    <th
                                        className='h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100'
                                    >
                                        Tax
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Unit Price
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                    <th
                                        className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                    >
                                        Total
                                    </th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-full flex  flex-col items-end justify-end text-right space-x-4">
                    <div className="max-w-xs w-full space-y-2 text-right mt-8">
                        <div className="flex w-full items-center text-lg justify-between text-slate-700">
                            <p>Subtotal:</p>
                            <p>21313</p>
                        </div>
                        <div className="flex w-full items-center text-lg justify-between text-slate-700">
                            <p>Subtotal:</p>
                            <p>21313</p>
                        </div>
                        <div className="flex w-full items-center text-lg justify-between text-slate-700">
                            <p>Subtotal:</p>
                            <p>21313</p>
                        </div>
                        <div className="flex w-full items-center text-lg justify-between text-slate-700">
                            <p>Subtotal:</p>
                            <p>21313</p>
                        </div>

                    </div>
                    <form onSubmit={handleSubmit}>
                            
                         {signature ? (
                        <div className="relative mt-10">
                          
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
                          ) :
                          (
                            <div className="mt-10">
                            <h2 className="text-2xl text-left">Signature:</h2>
                            <div className="flex space-x-4">
                             <button type="button" onClick={handleOpenModal} className="cursor-pointer border-2 border-dashed border-gray-300 text-gray-300 rounded-lg p-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faPenFancy} size="2x" />
                          </button>
                            <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-gray-300 text-gray-300 rounded-lg p-4 flex items-center justify-center">
                                <FontAwesomeIcon icon={faUpload} size="2x" />
                           <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                         </label>
                          </div>  </div>
                          )}
                      
                   </form>
                     </div>

                <div className="flex mt-24 w-full space-x-4">

                    <div className="w-full">
                        <h4 className="text-lg text-gray-800">Terms and Conditions</h4>
                        <div className="mt-2 flex space-x-2 items-center">
                            <i class="fa-solid fa-arrow-turn-down-right text-gray-500"></i> <p className="text-md text-slate-500">asd</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <h4 className="text-lg text-gray-800">Invoice Note</h4>
                        <div className="mt-2 flex space-x-2 items-center">
                            <i class="fa-solid fa-arrow-turn-down-right text-gray-500"></i> <p className="text-md text-slate-500">asd</p>
                        </div>
                    </div>

                </div>

                <footer className="">
                    <hr className="my-4 border-t-2 rounded-full" />

                    <div class="mt-4 flex-grow-1">
                        <h4 class="text-lg font-semibold text-gray-800  ">Thank you!</h4>
                        <p class="text-gray-500">
                            If you have any questions concerning this invoice, use the following
                            contact information:
                        </p>
                        <div class="mt-2">
                            <p class="block text-sm font-medium text-gray-800  ">
                                {businessEmail}
                            </p>
                            <p class="block text-sm font-medium text-gray-800  ">
                                {businessPhone}
                            </p>
                        </div>
                    </div>
                </footer>

            </div>
            <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Signature Pad Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px'
          }
        }}
      >
        <h2>Signature Pad</h2>
        <SignaturePad onSave={handleSaveSignature} />
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
        </div>
    )
}

export default InvoiceTemplate;