<?php

namespace App\Http\Controllers;

use App\Models\Design;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDesignRequest;
use App\Http\Requests\UpdateDesignRequest;
use App\Http\Resources\DesignResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DesignController extends Controller
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
        
        $query = Design::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $designs = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Design/Index", [
            "designs" => DesignResource::collection($designs),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        $user = auth()->user();

        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }

        return inertia("Design/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesignRequest $request)
    {
        $data = $request->validated();
        $image = null;
        $design = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('designs', 'public');
            $data['image'] = $image;
        }

        if ($request->has('price')) {
            $data['price'] = $request->input('price');
        }

        if ($request->has('technique')) {
            $data['technique'] = $request->input('technique');
        }

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $design = Design::create($data);

        if ($design) {
            return response()->json([
                'id' => $design->id,
                'price' => $request->input('price'),
                'image' => $image
            ], 200);
        } else {
            return response()->json([
                'message' => 'Error al crear el diseño.'
            ], 500);
        }
    }

    public function store_admin(StoreDesignRequest $request)
    {
        $user = auth()->user();

        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }

        $data = $request->validated();
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('designs', 'public');
            $data['image'] = $image;
        }

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Design::create($data);
        return to_route('design.index')
            ->with('success', 'Diseño registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Design $design)
    {
        return $design;
    }


    public function edit(Design $design)
    {
        $user = auth()->user();

        if ($user->role !== 'ADMIN') {
            abort(403, 'No tienes permiso para acceder a esta página.');
        }

        return inertia('Design/Edit', [
            'design' => new DesignResource($design),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesignRequest $request, Design $design)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if ($request->hasFile('image')) {
            if ($design->image) {
                Storage::disk('public')->delete($design->image);
            }
            $image = $request->file('image')->store('designs', 'public');
            $data['image'] = $image;
        } else {
            unset($data['image']);
        }

        $design->update($data);

        return to_route('design.index')
            ->with('success', 'Diseño actualizado exitosamente.');
    }

    public function destroy(Design $design)
    {
        $name = $design->name;

        $design->delete();

        if ($design->image) {
            Storage::disk('public')->delete($design->image);
        }

        return to_route('design.index')
            ->with('success', "Diseño \"$name\" eliminado exitosamente.");
    }

    public function list($id)
    {
        $product = Product::findOrFail($id);
        $designsQuery = Design::query();
        
        $technique = request()->input('technique'); 

        if ($technique) {
            $designsQuery->where('technique', $technique);
        }

        $designs = $designsQuery->get();

        return inertia('Design/List', [
            'product' => $product,
            'designs' => $designs,
        ]);
    }

}