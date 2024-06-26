<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Color;
use App\Models\Size;
use App\Models\Category;
use App\Models\ColorsProduct;
use App\Models\SizesProduct;
use App\Models\CategoriesProduct;
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
use Carbon\Carbon;

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
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        $products = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Product/Index", [
            "products" => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function catalog(ProductRequest $request)
    {
        $query = Product::query();
        $searchTerm = $request->input('search');
        $categoryName = $request->input('category');
        $sleeveType = $request->input('sleeve');
        $filter = $request->input('filter');

        $query->where('published', 1);

        if ($searchTerm) {
            $query->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhere('price', 'like', '%' . $searchTerm . '%')
                    ->orWhere('stock', 'like', '%' . $searchTerm . '%')
                    ->orWhere('sleeve', 'like', '%' . $searchTerm . '%');
            });
        }

        if ($categoryName) {
            $query->whereHas('categories', function ($query) use ($categoryName) {
                $query->where('name', $categoryName);
            })->doesntHave('categories', 'and', function ($query) use ($categoryName) {
                $query->where('name', '<>', $categoryName);
            });
        }

        if ($sleeveType) {
            $query->where('sleeve', $sleeveType);
        }

        if ($filter === 'newest') {
            $oneWeekAgo = Carbon::now()->subWeek();
            $query->where('created_at', '>=', $oneWeekAgo);
        }

        $products = $query->with('colors', 'images')->paginate(10);

        return inertia("Product/Catalog", [
            "products" => ProductResource::collection($products),
            "searchTerm" => $searchTerm,
        ]);
    }

    public function personalize($id, Request $request)
    {
        $designDetails = $request->query('design_details');
        $design = json_decode(urldecode($designDetails));

        $product = Product::with('sizes', 'images.colors')->findOrFail($id);

        $sizes = $product->sizes;
        $images = $product->images;
        return inertia("Product/Personalize", [
            "product" => $product,
            "sizes" => $sizes,
            "images" => $images,
            "design" => $design,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }
        $colors = Color::all();
        $sizes = Size::all();
        $categories = Category::all();
        return inertia("Product/Create", [
            'colors' => $colors,
            'sizes' => $sizes,
            'categories' => $categories,
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
        if ($request->has('selectedCategories')) {
            $product->categories()->attach($request->selectedCategories);
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
    public function show($id)
    {
        $product = Product::findOrFail($id);
        $colors = $product->colors()->get();
        $sizes = $product->sizes()->get();
        $images = $product->colors()->with('images')->get();
        return inertia('Product/Show', [
            'product' => $product,
            'colors' => $colors,
            'sizes' => $sizes,
            'images' => $images,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $allSizes = Size::all();
        $allCategories = Category::all();
        $selectedSizes = $product->sizes()->get();
        $selectedCategories = $product->categories()->get();
        return inertia('Product/Edit', [
            'product' => $product,
            'allSizes' => $allSizes,
            'allCategories' => $allCategories,
            'selectedSizes' => $selectedSizes,
            'selectedCategories' => $selectedCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'sleeve' => $request->sleeve,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        $product->colors()->sync($request->selectedColors);
        $product->sizes()->sync($request->selectedSizes);
        $product->categories()->sync($request->selectedCategories);

        return redirect()->route('product.index')->with('success', 'Producto actualizado exitosamente.');
    }



    public function patch(Request $request, Product $product)
    {

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->colors()->detach();
        $product->sizes()->detach();
        $product->categories()->detach();
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }
        $product->delete();
        return redirect()->route('product.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }

}