<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        $count = count($tasks);

        return view('app')->with(['tasks' => $tasks, 'count' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $new_count = Task::all()->count() + 1;

        $validated = $request->merge(['priority' => $new_count])->validate([
            'task_name' => 'required|string|max:255',
            'priority' => 'required|numeric'
        ]);

        $tasks = Task::create($validated);

        return redirect()->back()->with(['tasks' => $tasks, 'count' => $new_count]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        $validated = $request->validate([
            'task_name' => 'required|string|max:255'
        ]);

        $task->forceFill($validated);

        if ($task->update($validated)) {
            return response()->json(['success' => true]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->delete();

        return response()->json(['success' => true]);
    }
}
