import React , { useState, useRef } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; 
import userImage from './assets/Creeperasha_Linux_test_image_upload.png'; 
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'; 
import * as XLSX from 'xlsx'; 
import image from './assets/rubaitul-azad-GauA0hiEwDk-unsplash.jpg'

const Dashboard = () => {
  const [uploadedItems, setUploadedItems] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; 
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      
      const newItems = data.slice(1).map((row, index) => ({
        srNo: index + 1,
        link: row[0],  
        prefix: row[1], 
        selectedTags: [],
      }));

      setUploadedItems(newItems);
    };

    reader.readAsBinaryString(file);
  };

  const handleTagChange = (index, event) => {
    const newUploadedItems = [...uploadedItems];
    const selectedTag = event.target.value;

    if (!newUploadedItems[index].selectedTags.includes(selectedTag)) {
      newUploadedItems[index].selectedTags.push(selectedTag);
    }

    setUploadedItems(newUploadedItems);
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-name">Base</span>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item active">
              <i className="icon icon-dashboard"></i> Upload
            </li>
            <li className="menu-item">
              <i className="icon icon-upload"></i> Dashboard
            </li>
            <li className="menu-item">
              <i className="icon icon-invoice"></i> Invoice
            </li>
            <li className="menu-item">
              <i className="icon icon-schedule"></i> Schedule
            </li>
            <li className="menu-item">
              <i className="icon icon-calendar"></i> Calendar
            </li>
            <li className="menu-item">
              <i className="icon icon-notification"></i> Notification
            </li>
            <li className="menu-item">
              <i className="icon icon-settings"></i> Settings
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>Upload CSV</h2>
          <div className="user-info">
            
            <FontAwesomeIcon icon={faBell} className="notification-icon" />
            
            <img
              src={userImage}  
              alt="User avatar"
              className="user-avatar"
            />
          </div>
        </header>

        <section className="upload-section">
          <div className="upload-box">
            <img
              src={image}
              alt="Upload Area"
              className="upload-icon"
              onClick={triggerFileInputClick}
            />
            <FontAwesomeIcon icon={faFileExcel} className="excel-overlay" />
            <p> Drop your excel file here</p>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }} 
            />
            <button className="upload-button" onClick={handleUpload}>Upload</button>
          </div>
        </section>

        
        <section className="uploaded-items">
          <h3>Uploaded Items</h3>
          <table className="uploaded-items-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Link</th>
                <th>Prefix</th>
                <th>Add Tags</th>
                <th>Selected Tags</th>
              </tr>
            </thead>
            <tbody>
              {uploadedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.srNo}</td>
                  <td><a href={item.link} target="_blank" rel="noopener noreferrer">Link</a></td>
                  <td>{item.prefix}</td>
                  <td>
                    <label>
                      <select
                        value=""
                        onChange={(event) => handleTagChange(index, event)}
                      >
                        <option value="" disabled>Select Tag</option>
                        <option value="Tag 1">Tag 1</option>
                        <option value="Tag 2">Tag 2</option>
                        <option value="Tag 3">Tag 3</option>
                      </select>
                    </label>
                  </td>
                  <td>{item.selectedTags.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
