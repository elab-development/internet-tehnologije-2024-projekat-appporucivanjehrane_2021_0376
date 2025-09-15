<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuItemResource;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menuItems = MenuItem::all();
        if ($menuItems->isEmpty()) {
            return response()->json('No menu items found!', 404);
        }
        return response()->json([
            'menu_items' => MenuItemResource::collection($menuItems)
        ]);
    }

    public function searchMenu(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([
                'message' => 'Please provide a search term.',
                'menu_items' => [],
            ], 400);
        }

        $menuItems = MenuItem::where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->orWhere('category', 'like', '%' . $query . '%')
            ->get();

        $count = $menuItems->count();

        return response()->json([
            'count' => $count,
            'menu_items' => MenuItemResource::collection($menuItems)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'availability' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $menuItem = MenuItem::create($request->all());

        return response()->json([
            'message' => 'Menu item created',
            'menu_item' => new MenuItemResource($menuItem)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $menuItem = MenuItem::find($id);
        if (is_null($menuItem)) {
            return response()->json('Menu item not found', 404);
        }
        return response()->json([
            'menu_item' => new MenuItemResource($menuItem)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        if (!Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'availability' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $menuItem->update($request->all());

        return response()->json([
            'message' => 'Menu item updated',
            'menu_item' => new MenuItemResource($menuItem)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        if (!Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $menuItem->delete();
        return response()->json('Menu item deleted');
    }
}
