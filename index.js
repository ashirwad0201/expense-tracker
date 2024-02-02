var list=document.getElementById('list-items');
list.addEventListener('click' ,removeElement);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:7000/get-expense')
    .then(
        (response)=>{
            console.log(response);
            for(var i=0;i<response.data.length;i++){
                console.log(response.data[i]);
                showData(response.data[i]);
            }
        }
    )
    .catch(
        (err)=>console.log(err)
    )
})

function tracker(){
    var expAmount_=document.getElementById('id1').value;
    var desc_=document.getElementById('id2').value;
    var categ_=document.getElementById('id3').value;
    

    let myObj={
        price: expAmount_,
        description: desc_,
        category: categ_
    };
    axios.post('http://localhost:7000/insert-expense',myObj)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
    showData(myObj);
} 

function showData(myObj){
    console.log(myObj)
    var newList=document.createElement('li');
    newList.className="list-group-item"
    var text=myObj.price+" - "+myObj.description+" - "+myObj.category+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className="btn btn-danger btn-sm delete";
     delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    var EditButton=document.createElement('button');
    EditButton.className='btn btn-primary edit btn-sm';
    EditButton.appendChild(document.createTextNode('Edit'));
    newList.appendChild(EditButton);

    list.appendChild(newList);
}


function removeElement(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
           
            var description=li.textContent.split(" - ")[1];
            axios.delete(`http://localhost:7000/delete-expense/${description}`)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            list.removeChild(li);
        }
    }
    else if(e.target.classList.contains('edit')){
        var li=e.target.parentElement;
        const arr=li.textContent.split(" - " );
        var description=arr[1];
        localStorage.removeItem(description);
        document.getElementById('id1').value=arr[0];
        document.getElementById('id2').value=arr[1];
        document.getElementById('id3').value=arr[2];
        list.removeChild(li);
    }
}