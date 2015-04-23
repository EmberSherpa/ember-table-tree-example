var seed;

let id = 0;

/**
 * Create data always returns the same dataset of arbitrary
 * @param columns
 * @param count
 * @returns {Array}
 */
export default function createData(columns, count = 1000, randomSeed = 6) {
  // the initial seed
  seed = randomSeed;
  var data = [];
  for (var i = 0; i < count; i++) {
    id++;
    var row = {id: id};
    columns.mapBy('contentPath').forEach(function(contentPath){
      var value;
      if (contentPath === 'name') {
        value = `Item ${i}`;
      } else {
        value = seededRandom(1, 1000);
      }
      row[contentPath] = value;
    });
    data.push(row);
  }
  return data;
}

// source: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
var seededRandom = function(max, min) {
  max = max || 1;
  min = min || 0;

  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;

  return min + rnd * (max - min);
};
