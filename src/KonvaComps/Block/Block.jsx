import { useEffect, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import BindBorder from "../BindBorder/BindBorder.jsx";
import { store } from "../../store"; 
import { useDispatch, useSelector } from "react-redux";
import { removeBlock } from "../../actions/ActionGenerators";
import { useSubscribe } from "../../hooks/hooks";
import {getFillByType , getStrokeByType , calculateTextSize } from '../../Utils/BlockUtils.js'; 
import { addEdge , clearArrowBind} from "../../actions/ActionGenerators";
import "./Block.css";

export default function Block(props) {
  const [cords, setCords] = useState({
    x: props.x,
    y: props.y,
    isDragging: false
  });
  const [idtf, setId] = useState(props.idtf);
  const [blockType ,setBlockType] = useState();
  const [startId , setStartId ] = useState('');
  const [isArrowBind , setArrowBind] = useState(false); 

  const dispatcher = useDispatch(); 

  useEffect(()=>{
    const state = store.getState();
    
    const cur_block = state.network.blocks.filter(block=> (block.id === idtf))[0];   
    if ( cur_block ){
      setBlockType( cur_block.type );  
    }
  },[]); 

  useSubscribe(() => {
    const state = store.getState(); 
    const cur_block = state.network.blocks.filter(block=> (block.id === idtf))[0];   

    setStartId(prev => state.arrowBind.startId); 
    setArrowBind(prev => state.arrowBind.isArrowBind); 

    if ( cur_block ){
      setBlockType( cur_block.type );  
    }
  }); 

  const onDragMove = (e) => {
    props.onDrag(e.target.x(), e.target.y(), idtf);
  };

  const onMouseDown = (e) => {
    if(isArrowBind){
      dispatcher(addEdge(startId, idtf));
      dispatcher(clearArrowBind()); 
    }
  };

  const onDragStart = (e) => {
    setCords(prev => ({x:prev.x , y:prev.y , isDragging:true})); 
  }

  const onDragEnd = (e) => {
    setCords(prev => ({x:prev.x , y:prev.y , isDragging:false})); 
  }

  const onDoubleClick1 = (e) => {
    e.cancelBubble = true; 
    dispatcher(removeBlock(idtf)); 
  }

  return (
    <Group
      draggable
      onDragMove={onDragMove}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
      onDblClick={onDoubleClick1}
      x={cords.x}
      y={cords.y}
      idtf={props.idtf}
    >
      <BindBorder 
        onArrowBind={props.onArrowBind} 
        idtf={idtf}
      >
        <Rect
          {...props}
          width={150}
          height={100}
          x={0}
          y={0}
          cornerRadius={5}
          fill={getFillByType(blockType)} 
          strokeWidth={1} // border width
          stroke={getStrokeByType(blockType)} // border color
        />
        <Text
          text={props.text}
          x={15}
          y={10}
          width={120}
          height={80}
          fontSize={calculateTextSize(props.text.length)}
          verticalAlign="middle"
          align={"center"}
        />
      </BindBorder>
    </Group>
  );
}