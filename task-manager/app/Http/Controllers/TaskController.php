<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        $count = count($tasks);

        return view('app')->with(['tasks' => $tasks->sortBy('priority'), 'count' => $count]);
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

        Task::create($validated);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        $validated = $request->validate([
            'task_name' => 'sometimes|required|string|max:255',
            'task_data' => 'sometimes|required|array',
            'task_data.*' => 'numeric'
        ]);

        if (isset($request->task_name)) {
            if ($task->update($validated)) {
                return response()->json(['success' => true]);
            }
        } elseif (isset($request->task_data)) {
            try {
                DB::transaction(function() use($request, $id) {
                    $current = $request->task_data['draggedPriority'];
                    $previous = $request->task_data['prevElementPriority'];

                    if ($current > $request->task_data['nextElementPriority']) {
                        $new = $request->task_data['nextElementPriority'];
                        $moved_up = true;
                    } else {
                        $new = $request->task_data['prevElementPriority'];
                        $moved_up = false;
                    }
    
                    $updated_task = DB::table('tasks')->where('priority', $current)
                        ->update(['priority' => $new]);
                    
                    if ($updated_task === 0) {
                        throw new \Exception("Task wasn't updated: $current");
                    }
    
                    if ($moved_up) {
                        DB::table('tasks')->whereBetween('priority', [$new, $current - 1])
                            ->where('id', '!=', $id)
                            ->increment('priority');
                    } else {
                        DB::table('tasks')->whereBetween(
                            'priority', 
                            [$previous == 0 ? $current, $new]
                            )
                            ->where('id', '!=', $id)
                            ->decrement('priority');
                    }
                });
            } catch (\Exception $e) {
                dd($e->getMessage());
            }

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

        // Update priority of subsequent record
        $after = Task::firstWhere('priority', $task->priority + 1);

        if (!$after) return response()->json(['success' => true]);

        if ($after->update(['priority' => $task->priority])) {
            return response()->json(['success' => true]);
        }
    }
}
