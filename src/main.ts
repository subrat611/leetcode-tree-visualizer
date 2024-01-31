import TreeNode from "./data-structures/TreeNode";
import renderTree from "./render/drawTree";

const canvas = document.querySelector("canvas");
const root = new TreeNode(10);
const root1 = new TreeNode(12);
root.setLeftNode(root1);

const root2 = new TreeNode(13);
root.setRightNode(root2);


const root3 = new TreeNode(13);
root2.setRightNode(root3);
root1.setLeftNode(root3);


const root4 = new TreeNode(11);
root2.setLeftNode(root4);


renderTree(root, canvas)