<?php

namespace App\Filament\Resources\ImagesProductResource\Pages;

use App\Filament\Resources\ImagesProductResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListImagesProducts extends ListRecords
{
    protected static string $resource = ImagesProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()->label('Subir Imagen'),
        ];
    }
}
