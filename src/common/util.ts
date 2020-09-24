// 生成8位编码
export const generate8Code = (num: number): string => {
    const str = "2367820149QWERTYUIOPASDFGHJKLZXCVBNM1456789";
    let res = '#';
    for (let i = 0; i < num; i++) {
        res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
}

// 数组扁平化
export const flatten = (arr: any[]): any[] => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}