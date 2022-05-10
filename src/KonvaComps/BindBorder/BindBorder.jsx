import { Group, Rect } from "react-konva";
import { useDispatch } from "react-redux";
import { startArrowBind } from "../../actions/ActionGenerators";

export default function BindBorder(props) {

  const dispatcher = useDispatch(); 

  const mouseEnter = (event) => {
    event.target.opacity(0.5);
  };
  const mouseLeave = (event) => {
    event.target.opacity(0);
  };

  function onBindStart(event){
    event.cancelBubble = true; 
    const pos = event.target.getStage().getPointerPosition(); 
    dispatcher(startArrowBind({
      x:+(pos.x), //  event.evt.pageX
      y:+(pos.y) //  event.evt.pageY
    }, props.idtf ));
  };

  const onDragMove = (event) => {
    event.target.setX(event.evt.clientX);
    event.target.setY(event.evt.clientY);
  };

  return (
    <Group>
      <Rect
        width={props.children[0].props.width + 20}
        height={props.children[0].props.height + 20}
        x={props.children[0].props.x - 10}
        y={props.children[0].props.y - 10}
        fill="black"
        cornerRadius={10}
        opacity={0}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseDown={onBindStart}
        onDragMove={onDragMove}
      />
      {props.children}
    </Group>
  );
}