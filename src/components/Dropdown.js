import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import React from 'react'

const PREDEFINED_DROPDOWN_LIST = [
  {
    id: "dropdown1", 
    label: "Dropdown 1"
  },
  {
    id: "dropdown2",
    label: "Dropdown 2"
  },
  {
    id: "dropdown3",
    label: "Dropdown 3"
  },
]

const PREDIFINED_DROPDOWN_IDS = PREDEFINED_DROPDOWN_LIST.map(item => item.id);

function Dropdown({ params, handleUpdate, ...propss }) {
  return <div style={{"text-align":"center","margin-top":"20px"}}>
    <Select
      value={params.value?params.value:params.textDropdown}
      placeholder="Value Not Correct"
      onChange={e => {
        handleUpdate(params.field, params.row?params.row.id:params.id, e.target.value);
      }}
    >
      {PREDEFINED_DROPDOWN_LIST.map(item => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
    </Select>
    {!PREDIFINED_DROPDOWN_IDS.includes(params.value?params.value:params.textDropdown) && <FormHelperText style={{"text-align":"center"}}>Value is not correct</FormHelperText>}
  </div>
}

export default Dropdown
