import { Fragment } from "react";
import { Arrow } from "react-konva";
import shortid from "shortid";

export default function ArrowsSet({
  blocks,
  blocksChanged,
  edges,
  blockWidth,
  blockHeight,
  onEdgeRemove
}) {

  function getMidPoint(startPointX, startPointY, endPointX, endPointY) {
    return {
      x: startPointX + (endPointX - startPointX) / 2,
      y: startPointY + (endPointY - startPointY) / 2
    };
  }

  return (
    <Fragment>
      {edges.map((edge, index) => {
        const stBlock = blocks.filter((block) => block.id === edge.startId)[0];
        const endBlock = blocks.filter((block) => block.id === edge.endId)[0];
        const midPoint = getMidPoint(
          stBlock.x + blockWidth / 2,
          stBlock.y + blockHeight / 2,
          endBlock.x + blockWidth / 2,
          endBlock.y + blockHeight / 2
        );
        function onDoubleClick (event){
          onEdgeRemove(edge.startId ,edge.endId); 
          event.cancelBubble = true; 
        }

        return (
          <Fragment key = {shortid.generate()} >
            <Arrow
              blocksChanged={blocksChanged}
              points={[
                stBlock.x + blockWidth / 2,
                stBlock.y + blockHeight / 2,
                midPoint.x,
                midPoint.y
              ]}
              fill="black"
              stroke="black"
              onDblClick={onDoubleClick}
            />
            <Arrow
              blocksChanged={blocksChanged}
              points={[
                midPoint.x,
                midPoint.y,
                endBlock.x + blockWidth / 2,
                endBlock.y + blockHeight / 2
              ]}
              fill="black"
              stroke="black"
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
}
