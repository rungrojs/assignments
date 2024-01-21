const assert = require('assert');
function findCommonPrefix(datas: string[]): string {
    const result: string[] = [];
    let checkingIndex: number = 0;

    while (true) {
        const currentCharacter = datas[0]?.[checkingIndex];

        if (!currentCharacter) {
            break;
        }

        if (datas.some(data => data[checkingIndex] !== currentCharacter)) {
            break;
        }

        result.push(currentCharacter);
        checkingIndex++;
    }
    // for large string, use concatenate.
    return result.join('');
}

assert.strictEqual(findCommonPrefix(["flower", "flow", "flight"]), 'fl', 'Should return "fl"')
assert.strictEqual(findCommonPrefix(["dog", "racecar", "car"]), '', 'Should return ""')
assert.strictEqual(findCommonPrefix(["carcare", "car", "carcare"]), 'car', 'Should return "car"')
