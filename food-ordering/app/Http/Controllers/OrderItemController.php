<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderItemResource;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderItems = OrderItem::with('menuItem')->get();
        if ($orderItems->isEmpty()) {
            return response()->json('No order items found!', 404);
        }
        return response()->json([
            'order_items' => OrderItemResource::collection($orderItems)
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
        //
    }

    /**
     * Store or update an order item.
     */
    public function storeOrUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'menu_item_id' => 'required|exists:menu_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $order = Order::find($request->order_id);

        if (Auth::id() !== $order->user_id && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $menuItem = MenuItem::find($request->menu_item_id);

        $orderItem = OrderItem::where('order_id', $order->id)
            ->where('menu_item_id', $menuItem->id)
            ->first();

        if ($orderItem) {
            $orderItem->quantity += $request->quantity;
            $orderItem->price = $orderItem->quantity * $menuItem->price;
            $orderItem->save();
        } else {
            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $menuItem->id,
                'quantity' => $request->quantity,
                'price' => $menuItem->price * $request->quantity,
            ]);
        }

        $order->total_price = $order->orderItems->sum('price');
        $order->save();

        return response()->json([
            'message' => 'Order item processed successfully',
            'order_item' => $orderItem,
            'total_price' => $order->total_price,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $orderItem = OrderItem::with('menuItem')->find($id);
        if (is_null($orderItem)) {
            return response()->json('Order item not found', 404);
        }
        return response()->json([
            'order_item' => new OrderItemResource($orderItem)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderItem $orderItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);

        if (Auth::id() !== $orderItem->order->user_id && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orderItem->delete();

        return response()->json(['message' => 'Order item deleted successfully']);
    }
}
