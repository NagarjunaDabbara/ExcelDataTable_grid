import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropdown from './Dropdown';
import './component.css'


const CardComponent = (props) => {
  const [changer, setchanger] = useState(false)

  const ChangeData =(val,key,type,e)=>{
    console.log(type == 'number1');
    //console.log(props.data[key][type]+"===>"+e.target.value)
    if(type == 'number1' || type == 'number2'){
    if(!isNaN(parseInt(e.target.value))){
    let tmp = props.data
    tmp[key][type]=parseInt(e.target.value);
    props.setData(tmp)
      }else{
    let tmp = props.data
    tmp[key][type]=parseInt(0);
    props.setData(tmp)
      }
    }
    else{
    console.log("HIY");
    let tmp = props.data
    tmp[key][type]=e.target.value
    props.setData(tmp)
    }
    setchanger(!changer)
  }
  useEffect(() => {

  }, [changer]);
    return (
<div class="wrap">
  <h1></h1>
  <table class="cards-table">
    <thead>
      <tr>
        <th>Column A</th>
        <th>Column B</th>
        <th>Column C</th>
        <th>Column D</th>
      </tr>
    </thead>
    <tbody>
    {
    props.data.map((val,key)=>(
      <>
      <tr>
      <h1 style={{"text-align": "center"}}>{val.id.replace('-',' ').replace('-',' ')}</h1>
      <td><textarea value={val.largeText2} onChange={(e)=>{ChangeData(val,key,'largeText2',e)}}/></td>
      <td><input value={val.number1} onChange={(e)=>{ChangeData(val,key,'number1',e)}}/></td>
      <td><input value={val.number2} onChange={(e)=>{ChangeData(val,key,'number2',e)}}/></td>
      <td><input value={val.text1} onChange={(e)=>{ChangeData(val,key,'text1',e)}}/></td>
      <td><input value={val.text2} onChange={(e)=>{ChangeData(val,key,'text2',e)}}/></td><br/>
      <Dropdown params={val} handleUpdate={props.handleUpdate} />
      </tr>
      </>
    ))
    }
    </tbody>
  </table>
</div>
    )
}
// 
export default CardComponent
