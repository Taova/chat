/**
 * Created by Марина on 16.06.2017.
 */
const utils = {
    deepEqual(src, dest) {
        return JSON.stringify(src) === JSON.stringify(dest);
    }
}

//export

export {utils};