<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Color;
use App\Models\Size;
use App\Models\ColorsProduct;
use App\Models\SizesProduct;
use App\Models\ImagesProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\SizesProductRequest;
use App\Http\Requests\ColorsProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
    
        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }

        $query = Product::query();
        $products = $query->paginate(10)->onEachSide(1);
        return inertia("Product/Index", [
            "products" => ProductResource::collection($products),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function catalog(ProductRequest $request)
    {
        $query = Product::query();
        $searchTerm = $request->input('search');
        
        if ($searchTerm) {
            $query->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('price', 'like', '%' . $searchTerm . '%')
                    ->orWhere('stock', 'like', '%' . $searchTerm . '%');
            });
        }
         
        $products = $query->with('colors', 'images')->paginate(15)->onEachSide(1);
        
        return inertia("Product/Catalog", [
            "products" => ProductResource::collection($products),
            "searchTerm" => $searchTerm,
        ]);
    }

    public function personalize($id)
    {
        $product = Product::with('sizes', 'colors.images')->findOrFail($id);
        $sizes = $product->sizes;
        $colors = $product->colors;
        return inertia("Product/Personalize", [
            "product" => $product,
            "sizes" => $sizes,
            "colors" => $colors,
        ]);
    }

    public function create()
    {
        $user = auth()->user();

        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }

        $colors = Color::all();
        $sizes = Size::all();

        return inertia("Product/Create", [
            'colors' => $colors,
            'sizes' => $sizes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        
        $product = Product::create($data);
        if ($request->has('selectedColors')) {
            $product->colors()->attach($request->selectedColors);
        }
    
        if ($request->has('selectedSizes')) {
            $product->sizes()->attach($request->selectedSizes);
        }
        
        foreach ($request->colorImages as $imageData) {
            $path = $imageData['file']->store('images', 'public');
            $product->images()->create([
                'product_id' => $product->id,
                'color_id' => $imageData['colorId'],
                'image' => $path,
            ]);
        }
        return redirect()->route('product.index')
                     ->with('success', 'Producto registrado exitosamente.');
    }

    public function details($id)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $allColors = Color::all();
        $allSizes = Size::all();
        $selectedColors = $product->colors()->get();
        $selectedSizes = $product->sizes()->get();
        $selectedColorsWithImages = $product->colors()->with('images')->get();
        return inertia('Product/Edit', [
            'product' => $product,
            'allColors' => $allColors,
            'allSizes' => $allSizes,
            'selectedColors' => $selectedColors,
            'selectedSizes' => $selectedSizes,
            'selectedColorsWithImages' => $selectedColorsWithImages,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
