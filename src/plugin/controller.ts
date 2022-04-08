figma.showUI(__html__, {width: 300, height: 400});

figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-rectangles') {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
        });
    }

    if (msg.type === 'set-image-fill-mode') {
        function setFillMode(node, fillMode) {
            const newFills = [];
            for (const paint of node.fills) {
                if (paint.type === 'IMAGE') {
                    // Get the (encoded) bytes for this image.
                    const clonedPaint = JSON.parse(JSON.stringify(paint));
                    clonedPaint.scaleMode = fillMode;
                    newFills.push(clonedPaint);

                    node.fills = newFills;
                }
            }
        }

        for (const node of figma.currentPage.selection) {
            setFillMode(node, msg.fillMode);
        }
    }

    if (msg.type === 'create-text-styles') {
        function createTextStyles(nodes) {
            const textNodes = [];
            let textNodesBySize = [];

            // Get Text Elements
            nodes.map((node) => {
                if (node.type === 'TEXT') {
                    textNodes.push(node);
                }
            });

            // textNodesBySize = textNodes.sort(function sortBySize(a, b) {
            //     a.fontSize > b.fontSize
            // })

            console.log(textNodesBySize);
        }

        createTextStyles(figma.currentPage.selection);
    }

    // figma.closePlugin();
};
