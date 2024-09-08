import './bootstrap'

// /** UPDATE AND DELETE TASKS */
// document.querySelectorAll('.delete').forEach(button => {
//   button.addEventListener('click', deleteTask)

//   async function deleteTask(e) {          
//       if (confirm("Are you sure you want to delete this task?")) {
//           e.preventDefault()

//           try {
//               const response = await fetch(`/tasks/${this.dataset.id}`, {
//                   method: 'DELETE',
//                   headers: {
//                       'X-CSRF-TOKEN': '{{ csrf_token() }}',
//                       'Accept': 'application/json'
//                   }
//               })
              
//               const res = await response.json()
//               if (res.success) {
//                   window.location.reload()
//               }
//           } catch (error) {
//               console.log("Something went wrong: ", error)
//               alert("Something went wrong! Please try again.")
//           }
//       }
//   }
// })

// document.querySelectorAll('.edit').forEach(button => {
//   button.addEventListener('click', function (e) {
//       e.preventDefault()

//       const id = this.dataset.id

//       enterEdit(id)

//       document.getElementById(`card-${id}`).addEventListener('keypress', async function(e) {
//           if (e.key === 'Enter') {
//               e.preventDefault()

//               const data = document.getElementById(`card-${id}`).value

//               try {
//                   const response = await fetch(`/tasks/${id}`, {
//                       method: 'PATCH',
//                       headers: {
//                           'X-CSRF-TOKEN': '{{ csrf_token() }}',
//                           'Content-Type': 'application/json'
//                       },
//                       body: JSON.stringify({
//                           task_name: data,
//                       })
//                   })
                  
//                   const res = await response.json()
//                   if (res.success) {
//                       window.location.reload()
//                   }
//               } catch (error) {
//                   console.log("Something went wrong: ", error)
//                   alert("Something went wrong! Please try again.")
//               }
//           }
//       })
//   })
// })

// document.querySelectorAll('.escape').forEach(button => {
//   button.addEventListener('click', function (e) {
//       e.preventDefault()

//       const id = this.dataset.id

//       escapeEdit(id)
//   })
// })

// function enterEdit(id) {
//   document.getElementById(`card-${id}`).classList.remove('hidden')
//   document.getElementById(`card-${id}`).classList.add('inline')
//   document.getElementById(`text-${id}`).classList.remove('inline')
//   document.getElementById(`text-${id}`).classList.add('hidden')

//   document.getElementById(`x-${id}`).classList.remove('hidden')
//   document.getElementById(`x-${id}`).classList.add('inline')
//   document.getElementById(`pencil-${id}`).classList.remove('inline')
//   document.getElementById(`pencil-${id}`).classList.add('hidden')
// }

// function escapeEdit(id) {
//   document.getElementById(`card-${id}`).classList.remove('inline')
//   document.getElementById(`card-${id}`).classList.add('hidden')
//   document.getElementById(`text-${id}`).classList.remove('hidden')
//   document.getElementById(`text-${id}`).classList.add('inline')

//   document.getElementById(`x-${id}`).classList.remove('inline')
//   document.getElementById(`x-${id}`).classList.add('hidden')
//   document.getElementById(`pencil-${id}`).classList.remove('hidden')
//   document.getElementById(`pencil-${id}`).classList.add('inline')
// }


// /** DRAG TASKS */
// function onDragStart(e) {
//   e.dataTransfer.setData('text/plain', e.target.id)
//   e.target.classList.add('dragging');
// }

// function onDragOver(e) {
//   e.preventDefault()
//   const draggable = document.querySelector('.dragging')
//   if (!draggable) return
//   const dropzone = e.currentTarget
//   const after = getDropCoordinates(dropzone, e.clientY)

//   if (after == null) {
//       dropzone.appendChild(draggable)
//   } else {
//       dropzone.insertBefore(draggable, after)
//   }
// }

// function onDragEnter(e) {
//   e.preventDefault()
// }

// function onDrop(e) {
//   e.preventDefault()
//   const draggable = document.querySelector('.dragging')
//   if (draggable) {
//       draggable.classList.remove('dragging')
//       console.log(draggable.dataset.id)
//       console.log(draggable.nextElementSibling.dataset.id)
//       console.log(draggable.previousElementSibling.dataset.id)
//   }
//   e.dataTransfer.clearData()
// }

// function getDropCoordinates(container, y) {
//   const elements = [...container.querySelectorAll('.drag-item:not(.dragging)')]
//   let closest = null
//   let closestOffset = Number.NEGATIVE_INFINITY

//   for (const element of elements) {
//       const box = element.getBoundingClientRect()
//       const offset = y - box.top - box.height / 2

//       if (offset < 0 && offset > closestOffset) {
//           closestOffset = offset
//           closest = element
//       }
//   }

//   return closest
// }

// function handleUpdatePriority() {
//   //
// }

// document.addEventListener('DOMCONTENTLoaded', () => {
//   const draggables = document.querySelectorAll('.drag-item')
//   draggables.forEach(draggable => {
//       draggable.addEventListener('dragend', () => {
//           draggable.classList.remove('dragging')
//       })
//   })
// })
