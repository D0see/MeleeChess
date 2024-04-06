export function hasCoordinatesInArray(twoDArr, coordinates) {
    if (twoDArr) {
      for (const value of twoDArr) {
        if (value[0] === coordinates[0] && value[1] === coordinates[1]) {
          return true;
        }
      }
      return false;
    }
    return false;
}
