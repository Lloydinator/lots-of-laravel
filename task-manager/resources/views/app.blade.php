<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Task Manager</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased bg-gray-900">
        <div class="bg-gray-700 max-w-xl mx-auto mt-8 px-6 py-10 border border-zinc-400 rounded-lg shadow-md">
            <form action="{{ route('tasks.store') }}" method="POST" class="">
                @csrf
            
                <input type="text" id="task" name="task_name" class="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-lime-500" placeholder="Enter your task here...">
                @error('task_name', 'priority')
                    <div class="text-red-500">Something went wrong</div>
                @enderror
                <div class="flex items-center justify-between pb-10 border-b border-gray-50 mb-5">
                    <button type="submit" class="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Task
                    </button>
                </div>
            </form>
            <div aria-label="tasks">
                @isset ($tasks)
                    @foreach ($tasks as $task)
                        <div class="flex justify-between w-full bg-slate-200 drop-shadow-lg p-4 mb-4 rounded-sm" aria-label="task">
                            <div>
                                <p id="text-{{ $task->id }}" class="text-sm inline">{{ $task->task_name }}</p>
                                <input type="text" id="card-{{ $task->id }}" class="hidden w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-lime-500" value="{{ $task->task_name }}"/>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button id="pencil-{{ $task->id }}" class="text-sky-500 hover:text-sky-700 transition-colors duration-200 edit inline" data-id="{{ $task->id }}">
                                    <x-heroicon-o-pencil class="h-5 w-5" />
                                </button>
                                <button id="x-{{ $task->id }}" class="text-red-500 hover:text-red-600 transition-colors duration-200 escape hidden" data-id="{{ $task->id }}">
                                    <x-heroicon-c-x-mark class="h-5 w-5" />
                                </button>
                                <button class="text-red-500 hover:text-red-600 transition-colors duration-200 delete" data-id="{{ $task->id }}">
                                    <x-heroicon-o-trash class="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    @endforeach
                @endisset
            </div>
        </div>
    </body>
    <script>
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', deleteTask)

            async function deleteTask(e) {          
                if (confirm("Are you sure you want to delete this task?")) {
                    e.preventDefault()

                    try {
                        const response = await fetch(`/tasks/${this.dataset.id}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                'Accept': 'application/json'
                            }
                        })
                        
                        const res = await response.json()
                        if (res.success) {
                            window.location.reload()
                        }
                    } catch (error) {
                        console.log("Something went wrong: ", error)
                        alert("Something went wrong! Please try again.")
                    }
                }
            }
        })

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault()

                const id = this.dataset.id

                enterEdit(id)

                document.getElementById(`card-${id}`).addEventListener('keypress', async function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault()

                        const data = document.getElementById(`card-${id}`).value

                        try {
                            const response = await fetch(`/tasks/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    task_name: data,
                                })
                            })
                            
                            const res = await response.json()
                            if (res.success) {
                                window.location.reload()
                            }
                        } catch (error) {
                            console.log("Something went wrong: ", error)
                            alert("Something went wrong! Please try again.")
                        }
                    }
                })
            })
        })

        document.querySelectorAll('.escape').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault()

                const id = this.dataset.id

                escapeEdit(id)
            })
        })

        function enterEdit(id) {
            document.getElementById(`card-${id}`).classList.remove('hidden')
            document.getElementById(`card-${id}`).classList.add('inline')
            document.getElementById(`text-${id}`).classList.remove('inline')
            document.getElementById(`text-${id}`).classList.add('hidden')

            document.getElementById(`x-${id}`).classList.remove('hidden')
            document.getElementById(`x-${id}`).classList.add('inline')
            document.getElementById(`pencil-${id}`).classList.remove('inline')
            document.getElementById(`pencil-${id}`).classList.add('hidden')
        }

        function escapeEdit(id) {
            document.getElementById(`card-${id}`).classList.remove('inline')
            document.getElementById(`card-${id}`).classList.add('hidden')
            document.getElementById(`text-${id}`).classList.remove('hidden')
            document.getElementById(`text-${id}`).classList.add('inline')

            document.getElementById(`x-${id}`).classList.remove('inline')
            document.getElementById(`x-${id}`).classList.add('hidden')
            document.getElementById(`pencil-${id}`).classList.remove('hidden')
            document.getElementById(`pencil-${id}`).classList.add('inline')
        }
    </script>
</html>
