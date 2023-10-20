"use client"
import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode'

export default function Dashboard(){
    const [nodes, setNodes] = useState<TreeNode[]>([]);

    return (
        <div className="card flex justify-content-center">
            <h1>Dashboard</h1>
        </div>
    )
}