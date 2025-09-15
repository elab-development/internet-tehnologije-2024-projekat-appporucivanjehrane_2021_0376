<?php

use App\Http\Controllers\Authentication\AuthController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/menu-items', [MenuItemController::class, 'index']);
Route::get('/menu-items/search', [MenuItemController::class, 'searchMenu']);
Route::get('/menu-items/{id}', [MenuItemController::class, 'show']);

Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);

Route::get('/order-items', [OrderItemController::class, 'index']);
Route::get('/order-items/{id}', [OrderItemController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('menu-items', MenuItemController::class)
        ->only(['store', 'update', 'destroy']);
    Route::resource('orders', OrderController::class)
        ->only(['store', 'update', 'destroy']);

    Route::post('/order-items', [OrderItemController::class, 'storeOrUpdate']);
    Route::delete('/order-items/{id}', [OrderItemController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

