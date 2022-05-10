import { Stage } from "react-konva"
import { ReactReduxContext } from "react-redux"
import { Provider } from "react-redux"
import { useState , useCallback, useEffect, useRef } from "react"

export const ReduxWrappedStage = ({onMouseDown, ondblclick , onMouseMove, children , width , height}) => {

    return (
        // вся дичь которая ниже нужна для того чтобы работал redux с react-konva
        <ReactReduxContext.Consumer> 
            {({ store }) => ( 
                <Stage
                    onMouseDown={onMouseDown}
                    onDblClick={ondblclick}
                    onMouseMove={onMouseMove}
                    width={width}
                    height={height} 
                >
                    <Provider store={store}> 
                        {children}
                    </Provider> 
                </Stage > )}
        </ReactReduxContext.Consumer> 
    );
}