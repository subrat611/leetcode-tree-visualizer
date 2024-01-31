class TreeNode {
    private data: number | null
    private left: TreeNode | null
    private right: TreeNode | null

    constructor(value: number | null) {
        this.data = value
        this.left = null
        this.right = null
    }

    setLeftNode(node: TreeNode | null) {
        this.left = node
    }

    setRightNode(node: TreeNode | null) {
        this.right = node
    }

    getHeight():number {
        let leftHeight = this.left?.getHeight() || 0
        let rightHeight = this.right?.getHeight() || 0

        return Math.max(leftHeight, rightHeight) + 1;
    }

    getNodeValue(node: TreeNode): number | null {
        return node.data;
    }

    getLeftNode(node: TreeNode): TreeNode {
        if (this.isLeftNodeAvailable(node)) {
            return node.left!;
        }

        return new TreeNode(null);
    }

    getRightNode(node: TreeNode): TreeNode {
        if (node.isRightNodeAvailable(node)) {
            return node.right!;
        }

        return new TreeNode(null);
    }

    isLeftNodeAvailable(node: TreeNode): boolean {
        if(node.left) {
            return true;
        }
        return false;
    }

    isRightNodeAvailable(node: TreeNode): boolean {
        if(node.right) {
            return true;
        }
        return false;
    }
}

export default TreeNode;