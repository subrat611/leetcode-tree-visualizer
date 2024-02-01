import './style.css'

import TreeNode from "./data-structures/TreeNode";
import renderTree from "./render/drawTree";

const canvas = document.querySelector("canvas");
const textArea = document.querySelector("textarea");
const runBtn = document.querySelector("#run-btn");
const clearBtn = document.querySelector("#clear-btn");

runBtn?.addEventListener("click", ()=> {

    if(textArea?.value === "") return;

    const root = constructTree();

    renderTree(root, canvas)
})

clearBtn?.addEventListener("click", ()=> {
    (textArea as HTMLTextAreaElement ).value = "";
    const context = canvas?.getContext('2d');
    context?.clearRect(0, 0, canvas!.width, canvas!.height)
})

function constructTree(): TreeNode {

    let parsedInputArray = parseInput(textArea!.value);

    const queue:TreeNode[] = [];
    
    let idx = 0;
    const root = new TreeNode(parsedInputArray[idx]);
    idx++;
    
    queue.push(root);

    while(queue.length > 0 && idx < parsedInputArray.length) {
        const currentNode = queue.shift();

        // left child
        if(idx < parsedInputArray.length) {
            
            if(parsedInputArray[idx] != null) {
                const leftNode = new TreeNode(parsedInputArray[idx]);
                currentNode?.setLeftNode(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        // right child
        if(idx < parsedInputArray.length) {
            
            if(parsedInputArray[idx] != null) {
                const rightNode = new TreeNode(parsedInputArray[idx]);
                currentNode?.setRightNode(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }


    return root;
}

function parseInput(input: string) {
    let parsedInput = "";

    for(let i=0; i<input.length; i++) {
        const ch = input.charAt(i);

        if(ch !== ' ' && ch !== '[' && ch !== ']') parsedInput += ch;
    }

    return parsedInput.split(',').map((ele)=> {
        if(ele === 'null') return null;
        return parseInt(ele);
    })
}

window.addEventListener('resize', ()=> {
    const context = canvas?.getContext('2d');
    context?.clearRect(0, 0, canvas!.width, canvas!.height)

    const root = constructTree();

    renderTree(root, canvas)
})