const PostTodos = newTodos => {
  const credentials = JSON.parse(localStorage.getItem('userData'));
  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;

  fetch(`http://localhost:4000/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${EMAIL}:${PASSWORD}`,
    },
    body: JSON.stringify(newTodos),
  }).then(() => {});
};

export default PostTodos;
