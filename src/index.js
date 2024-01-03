document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('create-task-form').addEventListener('submit', function(event){
    event.preventDefault()
    let taskDescriptionElement = document.getElementById('new-task-description');
    let taskDescription = taskDescriptionElement.value.trim();

    if (taskDescription !== '') {
      const listItem = document.createElement('li');
      listItem.textContent = taskDescription;

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        deleteTask(this);
      };

      // Create edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
        editTask(this);
      };

      // Append the delete and edit buttons to the list item
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);

      // Append the list item to the tasks list
      document.getElementById('tasks').appendChild(listItem);

      // Clear the input field after adding the task
      taskDescriptionElement.value = '';
    }
  });

  function deleteTask(button) {
    const listItem = button.parentNode;
    listItem.parentNode.removeChild(listItem);
  }

  function editTask(button) {
    const listItem = button.parentNode;
    const taskDescription = listItem.firstChild.textContent;

    // Replace the text content with an input field
    listItem.innerHTML = `<input type="text" value="${taskDescription}" />`;

    // Focus on the input field
    const inputField = listItem.firstChild;
    inputField.focus();

    // Set up an event listener for when the user presses Enter to save changes
    inputField.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        // Update the task description with the new value
        listItem.textContent = inputField.value;

        // Recreate delete and edit buttons
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
          deleteTask(this);
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
          editTask(this);
        };

        // Append the delete and edit buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
      }
    });
  }
});