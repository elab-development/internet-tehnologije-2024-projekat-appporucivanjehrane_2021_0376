<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('orderItems.menuItem')->get();
        if ($orders->isEmpty()) {
            return response()->json('No orders found!', 404);
        }
        return response()->json([
            'orders' => OrderResource::collection($orders)
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

        $order = Order::create([
            'user_id' => Auth::id(),
            'status' => 'pending',
            'total_price' => 0,
        ]);


        return response()->json([
            'message' => 'Order created',
            'order' => new OrderResource($order->load('orderItems.menuItem'))
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with('orderItems.menuItem')->find($id);
        if (is_null($order)) {
            return response()->json('Order not found', 404);
        }
        return response()->json([
            'order' => new OrderResource($order)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        if (Auth::id() !== $order->user_id && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $order->update($request->only(['status']));

        return response()->json([
            'message' => 'Order updated',
            'order' => new OrderResource($order)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if (Auth::id() !== $order->user_id && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $order->delete();
        return response()->json('Order deleted');
    }
}
