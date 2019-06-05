import React from 'react';

export default class Header extends React.Component {
    render() {
        return <header className="header">
            <div className="header-inner">
                <h1 className="header-title"><a href="https://github.com/brenner8023/gdut-course">Gdut - Course</a></h1>
                <p className="header-subtitle">免费开源的, 易于获取的广东工业大学计算机学院课程攻略</p>
            </div>
        </header>;
    }
}