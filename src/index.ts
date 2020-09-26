import { log } from "vortex-api";
import { IExtensionContext } from 'vortex-api/lib/types/api';
import DraggableTest from './DraggableTest';

//This is the main function Vortex will run when detecting the game extension. 
function main(context: IExtensionContext) {
    context.once(() => {
        log('debug', 'initialising your new extension!')
    });
    context.registerMainPage('extensions', 'Draggable', DraggableTest, {
        group: 'per-game'
    });
    return true;
}

module.exports = {
    default: main,
};