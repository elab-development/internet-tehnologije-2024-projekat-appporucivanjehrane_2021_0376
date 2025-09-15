<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            ['name' => 'Margherita Pizza', 'description' => 'Classic pizza with tomato, mozzarella, and basil.', 'price' => 10.99, 'category' => 'Main Course', 'availability' => true],
            ['name' => 'Caesar Salad', 'description' => 'Fresh romaine lettuce with Caesar dressing and croutons.', 'price' => 8.49, 'category' => 'Appetizer', 'availability' => true],
            ['name' => 'Chocolate Lava Cake', 'description' => 'Decadent dessert with a gooey chocolate center.', 'price' => 6.99, 'category' => 'Dessert', 'availability' => true],
            ['name' => 'Lemonade', 'description' => 'Refreshing homemade lemonade.', 'price' => 3.49, 'category' => 'Drink', 'availability' => true],
            ['name' => 'Grilled Salmon', 'description' => 'Perfectly grilled salmon with a lemon butter sauce.', 'price' => 15.99, 'category' => 'Main Course', 'availability' => true],
        ];

        foreach ($menuItems as $menuItem) {
            MenuItem::create($menuItem);
        }
    }
}
