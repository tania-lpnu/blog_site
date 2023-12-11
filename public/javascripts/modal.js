
function openModal() {
    document.getElementById('myModal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  function closeModalEdit() {
    document.getElementById('updateModal').style.display = 'none';
  }

  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
  }

  window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    };
    
   function openUpdateModal(postId) {
    fetch(`/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('updateTitle').value = post.title;
      document.getElementById('updateDescription').value = post.description;
      document.getElementById('updateForm').action = `/posts/${post.id}?_method=PUT`;
      document.getElementById('updateModal').style.display = 'block';
    })
    .catch(err => console.error('Error fetching post:', err));
}

function closeUpdateModal() {
    document.getElementById('updateModal').style.display = 'none';
}