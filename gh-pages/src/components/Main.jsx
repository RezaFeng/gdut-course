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
            <h2 className="list-name">导航列表</h2>
            <ul className="nav-list">
                {fileTree.map((item, idx)=>{
                    return <li id={idx} key={idx} onClick={this.handleClick}>{item.name}</li>;
                })}
            </ul>
            <h2 className="list-name">文件列表</h2>
            <table className="file-list">
                <thead>
                    <tr>
                        <td>Floders</td>
                        <td>Last Update</td>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.father.children.map((item, idx)=>{
                        return <tr key={idx}>
                            <td className="filename" key={idx}>
                            {
                                // 判断是文件夹还是文件, 文件的话要加上a标签
                                item.children? (<span id={idx} onClick={this.handleClick}>{item.name}</span>): (<a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>)
                            }
                            </td>
                            <td className="filetime">{item.mtime}</td>
                        </tr>;
                    })
                }
                </tbody>
            </table>
        </main>;
    }
}