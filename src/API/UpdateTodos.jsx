const UpdateTodos = updateTodoObject => {
  const credentials = JSON.parse(localStorage.getItem('userData'));
  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;
  fetch(`http://localhost:4000/todos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${EMAIL}:${PASSWORD}`,
    },
    body: JSON.stringify(updateTodoObject),
  }).then(() => {});
};

export default UpdateTodos;
