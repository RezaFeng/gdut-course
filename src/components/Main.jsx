import React from 'react';
import {nav_list} from '../api/db.js';

export default class Main extends React.Component {
    render() {
        console.log(nav_list);
        return <main className="main">
            <div className="nav-list">
                <h2>目录列表</h2>
                <ul>
                    {nav_list.map((item, idx)=>{
                        return <li key={idx}>{item}</li>;
                    })}
                </ul>
            </div>
            <div className="file-list">
                <h2>文件列表</h2>
            </div>
        </main>;
    }
}