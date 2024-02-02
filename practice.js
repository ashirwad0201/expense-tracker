const posts = [{title: 'POST'}];
var active;
var interval;

function getPost() {
    clearInterval(interval);
    interval = setTimeout( () => {
        console.log(posts);
        console.log(active);
    }, 1000);
}

function createPost() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: 'POST1'});
            resolve()
        }, 1000)
    }) 
}

function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            if(posts.length > 0){
                const poppedElement  = posts.pop();
                resolve(poppedElement);
            } else {
                reject("ERROR: ARRAY IS EMPTY")
            }
        }, 1000)
    })
}

function updateLastUserActivityTime() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            active=new Date();
            resolve(active);
        }, 1000)
    }) 
}

// Promise.all([createPost(),createPost(),createPost(),createPost(),updateLastUserActivityTime()]).then(
//     ()=>{
//         getPost();
//         deletePost().then(()=>{getPost()});
//     }
// )

async function fun1(){
    await Promise.all([createPost(),createPost(),createPost(),createPost(),updateLastUserActivityTime()]);
    getPost();
    await deletePost();
    getPost();
}   
fun1();