const fs = require('fs');
const path = require('path');
let template = 'let fileTree = '; // 生成db.js的模板

/**
 * 递归遍历获取所有文件, 文件目录树的数据结构示例如下:
 * [{
 *      name: "大一",
 *      children: [{}, {}]
 *  },
 *  {
 *      name: abc.md,
 *      children: null
 *  }
 * ]
 * @param {文件路径} target 
 */
function getAllFile(target) {
    let dirInfo = fs.readdirSync(target); // 当前目录下的文件和文件夹数组
    let fileArr = []; // 保存文件的数组
    let dirArr = []; // 保存文件夹的数组
    let fileTree = []; // 文件目录树

    for(let i = 0; i < dirInfo.length; i++) {
        // 获取指定文件的信息
        let stat = fs.statSync(path.join(target, dirInfo[i]));
        // 判断是文件还是文件夹
        if(stat.isFile()) {
			if(dirInfo[i] != 'createDB.js' && dirInfo[i] != 'db.js' && dirInfo[i] != 'README.md') {
				fileArr.push(dirInfo[i]);
			}
        } else if(dirInfo[i] != '.git'){
            dirArr.push(dirInfo[i]);
        }
    }
    // 遍历当前所有同级文件夹
    for(let i = 0; i < dirArr.length; i++) {
        let nextPath = path.join(target, dirArr[i]);
        let stat = fs.statSync(nextPath);

        fileTree.push({
            name: dirArr[i],
            mtime: stat.mtime.toDateString(),
            children: getAllFile(nextPath)
        });
    }
    // 遍历当前所有同级文件
    for(let i = 0; i < fileArr.length; i++) {
        let stat = fs.statSync(path.join(target, fileArr[i]));

        fileTree.push({
            name: fileArr[i],
            mtime: stat.mtime.toDateString(),
			url: ["https://github.com/brenner8023/gdut-course/tree/master", path.join(target, fileArr[i]).replace(/\\/g, '/')].join('/'),
            children: null
        });
    }

    return fileTree;
}

template += JSON.stringify(getAllFile('./'));
template += `;

export default fileTree;`;

// 打开并将template写入db.js
fs.open('./db.js', 'w', (err, fd) => {
    if(!err) {
        fs.write(fd, template, () => {
            fs.close(fd, ()=>{});
        });
    }
});