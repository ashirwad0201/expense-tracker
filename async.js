console.log('person1 shows ticket');
console.log('person2 shows ticket');

const preMovie=async ()=>{
    const person=new Promise((res,rej)=>{
        setTimeout(()=>res('ticket'),3000);
    });

    const getPopcorn=new Promise((res,rej)=>{
        setTimeout(()=>res('popcorn'),3000);
    });

    const getCandy=new Promise((res,rej)=>{
        setTimeout(()=>res('candy'),3000);
    });

    const getColddrink=new Promise((res,rej)=>{
        setTimeout(()=>res('colddrink'),3000);
    });

    let ticket= await person;

    let [popcorn,candy,colddrink]=await Promise.all([getPopcorn,getCandy,getColddrink]);
    console.log("got ${popcorn}, ${candy}, ${coldrink}");

    return ticket;
};

preMovie().then((t)=>{console.log('person3 shows ${t}')});


console.log('person4 shows ticket');