let obj ={
    a:1,
    f(){
        console.log(this.a++);
    }
}

setTimeout(obj.f,100)

