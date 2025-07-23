
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const postsContainer = document.getElementById('posts');


function displayComment(name, comment, email) {
  const newComment = document.createElement('div');
  newComment.classList.add('comment');
  newComment.innerHTML = `
    <strong>Name: ${name}</strong>
    <p>Comment: ${comment}</p>
    <p>Email: ${email}</p>
  `;
  commentsList.appendChild(newComment);
}


function displayPost(title, passage) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.innerHTML = `
    <h4>${title}</h4>
    <p>${passage}</p>
  `;
  postsContainer.appendChild(postDiv);
}


window.addEventListener('DOMContentLoaded', () => {
  const savedComments = JSON.parse(sessionStorage.getItem('comments')) || [];
  savedComments.forEach(c => displayComment(c.name, c.comment, c.email));

  const savedPosts = JSON.parse(sessionStorage.getItem('posts')) || [];
  savedPosts.forEach(p => displayPost(p.title, p.passage));
});


function fetchPostsAndSaveToSession() {
  fetch('http://localhost/efuyegela/efuyegela.php') 
    .then(response => response.json())
    .then(posts => {
      postsContainer.innerHTML = '';
      sessionStorage.setItem('posts', JSON.stringify(posts)); 
      posts.forEach(post => {
        displayPost(post.title, post.passage);
      });
    })
    .catch(error => {
      postsContainer.innerHTML = '<p>Failed to load posts.</p>';
      console.error('Error fetching posts:', error);
    });
}


commentForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = commentForm.elements['name'].value.trim();
  const comment = commentForm.elements['comment'].value.trim();
  const email = commentForm.elements['email'].value.trim();

  if (name && comment && email) {
    displayComment(name, comment, email);

    const savedComments = JSON.parse(sessionStorage.getItem('comments')) || [];
    savedComments.push({ name, comment, email });
    sessionStorage.setItem('comments', JSON.stringify(savedComments));

    commentForm.reset();

    
    if (!sessionStorage.getItem('posts')) {
      fetchPostsAndSaveToSession();
    }
  }
});


