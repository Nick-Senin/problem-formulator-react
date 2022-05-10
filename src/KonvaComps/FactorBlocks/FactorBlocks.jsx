import Block from '../Block/Block.jsx'
import { Fragment } from "react";
import { clearArrowBind } from '../../actions/ActionGenerators.js';


export const FactorBlocks = ({blocks, onArrowBind , onDrag , onBlockClick}) =>{

    return (
        <Fragment>
          {blocks.map((block, index) => (
            <Block
              key={block.id}
              text={block.factor}
              x={block.x}
              y={block.y}
              type={block.type}
              onDrag={onDrag}
              idtf={block.id}
            />
          ))}
        </Fragment>
    );
}