import React, { useState,useEffect } from 'react';
import './App.css';
import XLSX from 'xlsx'
import { Button } from '@material-ui/core';
import Dropdown from './components/Dropdown';
import Table from './components/Table';
import CardComponent from './components/CardComponent';

const EXTENSIONS = ['xlsx', 'xls', 'csv']

function App() {
  const [data, setData] = useState([])
  const [dropdowndata, setdropdowndata] = useState({});
  const handleSubmitData = () => {
    console.log("Submit to api:", data);
  }

  const handleUpdateCell = (field, id, value) => {
    const newData = [...data];
    console.log(newData);
    console.log(field+"---"+id+"----"+value);
    const item = newData.find(row => row.id === id);
    const rowIndex = newData.findIndex(row => row.id === id);
    console.log(item);
    if(item[field]){
    item[field] = value;
    }else{
      item['textDropdown']=value
    }
    newData.splice(rowIndex, 1, item);
    setData(newData);
  };

  const Columns = [
    { type: "number", field: "number1", headerName: "number 1", width: 150, editable: true },
    { type: "number", field: "number2", headerName: "number 2", width: 150, editable: true },
    { type: "text",  field: "text1", headerName: "text 1", width: 180, editable: true },
    { type: "text",  field: "text2", headerName: "text 2", width: 185, editable: true },
    { type: "text",  field: "largeText2", headerName: "largeText 2", flex: 1, editable: true },
    {
      field: "textDropdown", headerName: "textDropdown", flex: 0.8, editable: true,
      renderCell: (params) => <Dropdown params={params} handleUpdate={handleUpdateCell} setdropdowndata={setdropdowndata}/>,
    },
  ]

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (data) => {
    let error=0;
    const rows = []
    data.forEach((row, index) => {
      let rowData = { id: "data-record-" + index }
      Columns.forEach((column, colIndex) => {

        if(column.type === 'number'){
          if(!isNaN(parseInt(row[colIndex]))){
            rowData[column.field] = row[colIndex]
          }else{
            error+=1
          }
        }else{
        rowData[column.field] = row[colIndex]
        }  
        });
      rows.push(rowData);

    });
    if(error !== 0){
      alert('Data MisMatch')
      //return []
    }
    return rows
  }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      //removing header
      fileData.splice(0, 1)

      const recordData = convertToJson(fileData);
      setData(recordData);

    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
    }
  }

useEffect(() => {

}, [data]);
      //<Table
      //data={data}
      //Columns={Columns}
      //handleUpdateCell={handleUpdateCell}
      ///>
      // /  <CardComponent data={data} setData={setData} handleUpdate={handleUpdateCell}/>
  return (
    <div className="App">
      <h1 align="center">Reactjs application</h1>
      <h4 align='center'>Import Data from Excel, CSV in Material Table</h4>
      <label class="custom-file-upload" style={{ height: "auto", width: "auto",margin:"20px 2rem",display:"flex",border:"none"}}>
          <div>
          <input type="file" onChange={importExcel}/>
          <div style={{"margin":"10px 10px","padding":"1rem","border": "1px solid blue"}}>File Upload</div>
          </div>
      </label>
      <Table
      data={data}
      setData={setData}
      Columns={Columns}
      handleUpdateCell={handleUpdateCell}
      />
      <div style={{"text-align": "end"}}>
        <Button variant="contained" color="primary" onClick={handleSubmitData}>Submit</Button>
      </div>
    </div>
  );
}

export default App;
