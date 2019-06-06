import React from 'react';
import fileTree from '../api/db.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            father: fileTree[1]
        }
    }

    // 导航列表和文件列表点击事件的响应处理
    handleClick = (e) => {
        // 判断是不是点击了导航列表的li标签
        if(e.target.tagName.toLowerCase() === "li") {
            this.setState({father: fileTree[e.target.id]});
        } else {
            this.setState({father: this.state.father.children[e.target.id]});
        }
    }

    render() {
        return <main className="main">
            <div className="nav-list">
                <h2 className="list-name">导航列表</h2>
                <ul className="nav-items">
                    {fileTree.map((item, idx)=>{
                        return <li id={idx} key={idx} onClick={this.handleClick}>{item.name}</li>;
                    })}
                </ul>
            </div>
            <div className="file-list">
                <h2 className="list-name">文件列表</h2>
                <ul className="file-items">
                    <div className="firstline">
                        <span>Floders</span>
                        <span>Last Update</span>
                    </div>
                    {
                        this.state.father.children.map((item, idx)=>{
                            return <li key={idx}>
                                {
                                    // 判断是文件夹还是文件, 文件的话要加上a标签
                                    item.children? (<span className="filename" id={idx} onClick={this.handleClick}>{item.name}</span>): (<a href={item.url} className="filename" target="_blank" rel="noopener noreferrer">{item.name}</a>)
                                }
                                <span className="filetime">{item.mtime}</span>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </main>;
    }
}