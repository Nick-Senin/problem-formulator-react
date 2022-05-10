import ProblemStage from "./KonvaComps/ProblemStage/ProblemStage";
import TasksSystemHeader from './UI/TasksSystemHeader/TasksSystemHeader.jsx'; 
import FormulatorHeader from './UI/FormulatorHeader/FormulatorHeader'; 
import { MarkdownPane ,MARKDOWN_MODE, RAW_MODE } from "./UI/MarkdownPane/MarkdownPane";
import { useState } from "react";
import { store } from "./store";
import './App.css'; 

export default function App() {
  const [markMode , setMarkMode] = useState(MARKDOWN_MODE); 
  const [formulatedTasks , setFormulated] = useState('');

  //const [width , height] = useWindowSize(); 

  function onChangeMode (){
    if(markMode === MARKDOWN_MODE ){
      setMarkMode(RAW_MODE); 
      // ставить фокус на поле
    }
    if(markMode === RAW_MODE){
      setMarkMode(MARKDOWN_MODE); 
    }
  }

  function onFormulate(){
    const state = store.getState(); 
    setFormulated(state.formulatedTasks);
  }

  return (
    <div 
      className="App"
    >
      <TasksSystemHeader
        onChangeMode={onChangeMode} 
      />
      <FormulatorHeader
        onFormulate={onFormulate} 
      />
      <MarkdownPane
        recivedContent={formulatedTasks}
        renderMode={markMode}
        width={300}
      />
      <ProblemStage
        onFormulate={onFormulate}
      />
    </div>
  );
}