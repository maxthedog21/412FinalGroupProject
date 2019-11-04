class Question{
  this.q = null;
  this.a1 = null;
  this.a2 = null;
  this.a3 = null;
  this.a4 = null;

setAnswers(a1, a2, a3, a4){
  this.a1 = a1;
  this.a2 = a2;
  this.a3 = a3;
  this.a4 = a4;
}
setQ(q){
  this.q = q;
}
getQueston(){
  return this.q;
}
  f(){
    return [this.q, this.a1, this.a2, this.a3, this.a4];
  }
}