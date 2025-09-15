<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MenuItemSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
        ]);

        MenuItem::factory(20)->create();
        Order::factory(10)->create()->each(function ($order) {
            $items = MenuItem::inRandomOrder()->take(rand(2, 5))->get();
            $totalPrice = 0;

            foreach ($items as $item) {
                $quantity = rand(1, 3);
                $orderItem = OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item->id,
                    'quantity' => $quantity,
                    'price' => $item->price * $quantity,
                ]);
                $totalPrice += $orderItem->price;
            }

            $order->update(['total_price' => $totalPrice]);
        });


        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);
    }
}
