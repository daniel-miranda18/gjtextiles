<?php

namespace App\Http\Controllers\Api;

use App\Models\ImagesProduct;
use Illuminate\Http\Request;
use App\Http\Requests\ImagesProductRequest;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\ImagesProductResource;

class ImagesProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $imagesProducts = ImagesProduct::paginate();

        return ImagesProductResource::collection($imagesProducts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ImagesProductRequest $request): ImagesProduct
    {
        return ImagesProduct::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(ImagesProduct $imagesProduct): ImagesProduct
    {
        return $imagesProduct;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImagesProductRequest $request, ImagesProduct $imagesProduct): ImagesProduct
    {
        $imagesProduct->update($request->validated());

        return $imagesProduct;
    }

    public function destroy(ImagesProduct $imagesProduct): Response
    {
        $imagesProduct->delete();

        return response()->noContent();
    }
}
