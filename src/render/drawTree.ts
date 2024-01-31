import TreeNode from "../data-structures/TreeNode"
import { CONFIG } from "../utils/tree";


function renderTree(rootNode: TreeNode, canvasEle: HTMLCanvasElement | null) {

    // set canvas dimension same as window dimension
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if(canvasEle) {
        canvasEle.width = windowWidth;
        canvasEle.height = windowHeight;
    }

    const { nodeContainerHeight, nodeContainersWidth } = getTreeHeightWidth(rootNode);

    const windowCenter = windowWidth / 2;
    const nodeContainerWidthCenter = nodeContainersWidth / 2;

    const xStart = windowCenter - nodeContainerWidthCenter;
    const xEnd = windowCenter + nodeContainerWidthCenter;

    const horizontalConfig = { xStart, xEnd };

    // Draw tree
    drawTreeRecursively(rootNode, canvasEle, 0.5, horizontalConfig);
}

function getTreeHeightWidth(node: TreeNode) {
    const heightOfTree = node.getHeight();
    const maxLeafNodeAtLlevel = Math.pow(2, heightOfTree);

    const nodeContainerHeight = heightOfTree * CONFIG.HEIGHT_SPACING;
    const nodeContainersWidth = maxLeafNodeAtLlevel * CONFIG.WIDTH_SPACING;

    return {
        nodeContainerHeight,
        nodeContainersWidth
    };
}

function drawTreeRecursively(node: TreeNode, canvasEle: HTMLCanvasElement | null, currentLevel: number, horizontalConfig: {xStart: number, xEnd: number}) {
    const { xStart, xEnd } = horizontalConfig;

    const xPos = (xStart + xEnd) / 2;
    const yPos = currentLevel * CONFIG.HEIGHT_SPACING;

    const nodeValue = node.getNodeValue(node)?.toString() || "";
    drawNode(nodeValue, canvasEle, xPos, yPos);


    if(node.isLeftNodeAvailable(node)) {
        const leftNodeHorizontalConfig = {xStart, xEnd: xPos};
        drawTreeRecursively(node.getLeftNode(node), canvasEle, currentLevel + 1, leftNodeHorizontalConfig);

        const xCord = { xStart: xPos, xEnd: (xStart + xPos)/2 };
        const yCord = { yStart: yPos + CONFIG.RADIUS, yEnd: ((currentLevel+1)*CONFIG.HEIGHT_SPACING) - CONFIG.RADIUS};

        connectNodesEdge(canvasEle, xCord, yCord )
    }

    if(node.isRightNodeAvailable(node)) {
        const rightNodeHorizontalConfig = {xStart: xPos, xEnd};
        drawTreeRecursively(node.getRightNode(node), canvasEle, currentLevel + 1, rightNodeHorizontalConfig);

        const xCord = { xStart: xPos, xEnd: (xPos + xEnd)/2 };
        const yCord = { yStart: yPos + CONFIG.RADIUS, yEnd: ((currentLevel+1)*CONFIG.HEIGHT_SPACING) - CONFIG.RADIUS};
        
        connectNodesEdge(canvasEle, xCord, yCord )
    }
}

function drawNode(value: string, canvasEle: HTMLCanvasElement | null, x: number, y: number) {

    const context = canvasEle?.getContext("2d");
        
    // Draw circle
    context?.beginPath();
    context?.arc(x, y, CONFIG.RADIUS, 0, 2*Math.PI, false);
    (context as CanvasRenderingContext2D).fillStyle = "#6a00f4"; // type assertion
    context?.fill();

    // Draw circle border
    context?.arc(x, y, CONFIG.RADIUS, 0, 2*Math.PI, false);
    (context as CanvasRenderingContext2D).strokeStyle = "#10002b"; // type assertion
    (context as CanvasRenderingContext2D).lineWidth = 3;
    context?.stroke();

    // fill the node value
    (context as CanvasRenderingContext2D).font = `bold ${CONFIG.FONT_SIZE}px Arial`;
    (context as CanvasRenderingContext2D).fillStyle = "#f0fff1"; // type assertion
    (context as CanvasRenderingContext2D).textAlign = "center";

   
    (context as CanvasRenderingContext2D).fillText(value, x, y + (CONFIG.FONT_SIZE/3));

}

function connectNodesEdge(canvasEle: HTMLCanvasElement | null, xCord: {xStart: number, xEnd: number}, yCord: {yStart: number, yEnd: number}) {
    const { xStart, xEnd } = xCord;
    const { yStart, yEnd } = yCord;

    const start = { x: xStart, y: yStart };
    const end = { x: xEnd, y: yEnd };

    const xHalf = (xStart + xEnd)/2;
    const yHalf = (yStart + yEnd)/2;

    const cp1 = { x: xHalf, y: yHalf };
    const cp2 = { x: xEnd, y: yHalf };

    const context = canvasEle?.getContext("2d");
    context?.beginPath();
    (context as CanvasRenderingContext2D).strokeStyle = "#6a00f4";
    (context as CanvasRenderingContext2D).lineWidth = 2;
    context?.moveTo(start.x, start.y);
    context?.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    // context?.lineTo(end.x, end.y);
    context?.stroke();
}

export default renderTree;