import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';
import {selectMenu, disclosure} from 'figma-plugin-ds';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const imageFillMode = React.useRef<HTMLSelectElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = () => {
        const count = parseInt(textbox.current.value, 10);
        parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*');
    };

    const onUpdateImageFill = () => {
        const fillMode = imageFillMode.current.value;
        parent.postMessage({pluginMessage: {type: 'set-image-fill-mode', fillMode}}, '*');
    };

    const onCreateTextStyles = () => {
        parent.postMessage({pluginMessage: {type: 'create-text-styles'}}, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };

        //initialize all select menus
        selectMenu.init();
    }, []);

    return (
        <div>
            <h3 className="type type--large">Images</h3>
            <div className="option-set">
                <div className="label label-heading">Fill Mode</div>
                <div className="label">Set Image Fill Mode of Selection.</div>
                <select id="uniqueId" className="select-menu" ref={imageFillMode} onChange={onUpdateImageFill}>
                    {/* <option>Select Fill Mode</option> */}
                    <option value="FILL">Fill</option>
                    <option value="CROP">Crop</option>
                    <option value="FIT">Fit</option>
                    <option value="TILE">Tile</option>
                </select>
                <button className="button button--secondary" onClick={onUpdateImageFill}>
                    Set Fill Mode
                </button>
            </div>
            <div className="option-set">
                <h3 className="type type--large">Typography</h3>
                <div className="label label-heading">Try Creating Font Styles</div>
                <div className="label">Create styles from text without styles set.</div>
                <button className="button button--secondary" onClick={onCreateTextStyles}>
                    Create Font Styles
                </button>
            </div>
        </div>
    );
};

export default App;
