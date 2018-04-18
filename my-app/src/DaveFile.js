
class Dave1 {
    constructor(){
       this.message = "hello from dave 1"; 
    }

    getMessage(){
        return this.message; 
    }
}

class Dave2 {
    constructor(){
       this.message = "hello from dave2 "; 
    }

    getMessage(){
        return this.message; 
    }
}

function daveF(){
    return "daveF"; 
}

// think you can rename exported objects and functions as: 
// module.exports = {daf1 : Dave1, daf2 : Dave2}; 

module.exports = {Dave1, Dave2, daveF};  