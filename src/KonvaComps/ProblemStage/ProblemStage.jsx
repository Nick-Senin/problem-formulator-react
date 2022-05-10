import { Layer } from "react-konva";
import { useLayoutEffect , useEffect,  useRef , useState, useMemo } from "react";
import ArrowsSet from "../../KonvaComps/ArrowsSet/ArrowsSet";
import ArrowConnect from "../../KonvaComps/ArrowConnect/ArrowConnect";
import { BlockModal } from "../../UI/BlockModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { HARMFULL, USEFULL } from "../../constants/consts.js";
import {ReduxWrappedStage} from '../../KonvaComps/ReduxWrappedStage/ReduxWrappedStage.jsx';  
import { FactorBlocks } from "../../KonvaComps/FactorBlocks/FactorBlocks.jsx";
import { addBlock, changeBlock, clearArrowBind, removeBlock, removeEdge, setFormulatedTasks } from "../../actions/ActionGenerators.js";
import { store } from "../../store";
import shortid from 'shortid'
import { useParentSize, useSubscribe } from "../../hooks/hooks";
import TaskFormulator from "../../TasksFormulator";
import {useLocalStorage} from '../../hooks/hooks.js'; 
import './ProblemStage.css'; 

export default function ProblemStage({onFormulate }) {
  const [blocks, setBlocks] = useState( 
    useSelector(state => {
      return state.network.blocks; 
    })
  );

  const [edges, setEdges] = useState(
    useSelector(state => state.network.edges)
  );

  const [blocksChanged, setBlockChanged] = useState(false);
  const [isModal , setModal] = useState(false);
  const [mouse , setMouse] = useState({x:0 , y:0})

// --- 

  useEffect(()=>{

  }, [])

// --- 

  let container = useRef(); 
  const [width , height ] = useParentSize(container); 

  const dispatcher = useDispatch(); 
  
   useSubscribe(()=> {
      const state = store.getState();         

      localStorage['formulatorState'] = JSON.stringify(store.getState());

      setBlocks(prev => state.network.blocks );
      setEdges( prev => state.network.edges ); 
   }) 

  useEffect( () => {
    const tasks_system = TaskFormulator.formulateTasksSystem( store.getState().network.blocks,store.getState().network.edges );
    dispatcher(setFormulatedTasks(tasks_system)); 
    } 
  , [blocks,edges]); 

  const onDrag = (newX, newY, blockId) => {
    let ind = 0;
    let blockData = blocks.filter((b, index) => {
      if (b.id === blockId) {
        ind = index;
        return true;
      }
      return false;
    })[0];

    [blockData.x, blockData.y] = [newX,newY];

    setBlocks((prev) => {
      const newState = prev;
      newState.splice(ind, 1, blockData);
      return newState;
    });

    setBlockChanged((prev) => !prev);
  };

  const onMouseDown = (event) => {
    if ( (!event.target.parent || event.target.parent.nodeType !== "Group")) {
      dispatcher(clearArrowBind()); 
    }
  };

  const onMouseMove = (event) => {
    setMouse(prev => ({ 
      x:event.evt.layerX, 
      y:event.evt.layerY
    }));
  };

  const onEdgeRemove = (startId, endId) => {
    dispatcher(removeEdge(startId , endId)); 
  }

  const ondblclick = (event) => {
    setModal(true);
    dispatcher(addBlock({
      type:USEFULL, 
      factor:'' , 
      id:shortid.generate() , 
      x:event.evt.layerX, 
      y:event.evt.layerY
    }));
  }; 

  function onDeny(){
    setModal(false); 
    dispatcher(removeBlock(blocks[blocks.length-1].id)); 
  }

  function onSubmit( newFactor , newType ){
    setModal(false); 
    dispatcher( changeBlock( blocks[blocks.length-1].id , (!newType?HARMFULL:USEFULL) , newFactor )); 
  }

  return (
    <div 
        className="stageStyle"
        ref = {container}
    >
      <ReduxWrappedStage
        onMouseDown={onMouseDown}
        ondblclick={ondblclick}
        onMouseMove={onMouseMove}
        width={width}
        height={height}
      >
        <Layer>
          <ArrowsSet
            blocks={blocks}
            blocksChanged={blocksChanged}
            edges={edges}
            blockWidth={150}
            blockHeight={120}
            onEdgeRemove={onEdgeRemove}
          />
          <FactorBlocks
            blocks={blocks}
            onDrag={onDrag}
            clearArrowBind={clearArrowBind}
          />
          <ArrowConnect 
            mouseX={mouse.x}
            mouseY={mouse.y}
          />
        </Layer>
      </ReduxWrappedStage>
      <BlockModal 
        isDisplayed={isModal}
        onDeny = {onDeny}
        onSubmit={onSubmit}
      /> 
    </div>
  );
}