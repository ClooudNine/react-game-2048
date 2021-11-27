export const cloneState = (state) => state.slice(0, state.length);

export const isArraysEqualWith = (array, other, customizer) => {
       if (array.length !== other.length) {
              return false
       }
       return array.every((item, index) => customizer(item, other[index]));
}

