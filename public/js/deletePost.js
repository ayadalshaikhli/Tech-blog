const deleteButtonFunc = async (event) => {
  console.log("In delete javascript")
  const id = event.target.getAttribute('data-id');
  console.log(id);
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('.deleteButton')
  .addEventListener('click', deleteButtonFunc);