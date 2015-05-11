export default function insert(target, index, objects) {
  target.splice.apply(target, [index, 0].concat(objects));
  return target;
}
