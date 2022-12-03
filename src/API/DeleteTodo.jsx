const deleteTodo = updateTodoObject => {
  const credentials = JSON.parse(localStorage.getItem('userData'));
  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;
  fetch(`http://localhost:4000/todo`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${EMAIL}:${PASSWORD}`,
    },
    body: JSON.stringify(updateTodoObject),
  }).then(() => {});
};

export default deleteTodo;
