const title = document.createElement('p');
title.className = 'title';
title.textContent = 'Input ID';
document.body.appendChild(title);

const input = document.createElement('input');
input.className = 'input';
input.type = 'text';
document.body.appendChild(input);

const btn = document.createElement('button');
btn.className = 'btn';
btn.textContent = 'View comment';
document.body.appendChild(btn);

const postBlock = document.createElement('div');
document.body.appendChild(postBlock);

function checkPostById() {
    const postId = parseInt(input.value);

    const validateId = new Promise((resolve, reject) => {
        postId >= 1 && postId <= 100
           ? resolve(postId)        
           : reject('Please enter a number between 1 and 100');
        
    });

    validateId
        .then((postId) => {            
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        })
        .then((response) => {        
            return response.json();
        })
        .then((post) => {          
            postBlock.innerHTML = `<h3>Post ${post.id}</h3><p>${post.title}</p>`;         
            btn.style.display = 'block';
        })
        .catch((error) => {
            console.error(error);
            postBlock.innerHTML = `<p>${'Please enter a number between 1 and 100'}</p>`;
            btn.style.display = 'none';
        });


        btn.addEventListener('click', () => {  
  
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then((response) => response.json())
                .then((comments) => {
                    
                    comments.forEach((comment) => {
                        postBlock.innerHTML += `<p>${comment.name}: ${comment.body}</p>`;
                    });         
                 
                })
               
        });
}


input.addEventListener('change', checkPostById);