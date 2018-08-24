RegExp.prototype.execAll = function(string) {
  const matches = [];
  let m;
  if (this.global) {
    while ((m = this.exec(string))) {
      matches.push(m);
    }
  } else if ((m = this.exec(string))) {
    matches.push(m);
  }
  return matches;
};
