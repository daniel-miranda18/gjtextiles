<?php

namespace App\Filament\Resources\ImagesProductResource\Pages;

use App\Filament\Resources\ImagesProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateImagesProduct extends CreateRecord
{
    protected static string $resource = ImagesProductResource::class;
    protected static ?string $title = 'Subir Imagen';
    
    public function getSubheading(): ?string
    {
        return __('Seleccione un producto para subir la imagen');
    }
    
}
